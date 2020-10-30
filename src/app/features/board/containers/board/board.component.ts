import { Title } from '@angular/platform-browser';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  OnChanges,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { select, Store } from '@ngrx/store';

import { Observable, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { DragulaService } from 'ng2-dragula';

import {
  PageScrollService,
  PageScrollInstance,
  PageScrollOptions
} from 'ngx-page-scroll-core';

import autoScroll from 'dom-autoscroller';

import {
  IBoard,
  IBoardFilter,
  IBoardSummary,
  ICard,
  IList,
  IUser
} from '@boards/core/interfaces';

import { BoardRole, UserRole } from '@boards/core/enums';

import { SignalrService, ThemeService } from '@boards/core/services';

import { IState } from '@boards/store/state.interface';

import {
  MoveCard,
  MoveList,
  AddList,
  UpdateBoardSummary
} from '@boards/store/board';
import { ResetFilter } from '@boards/store/board-filter';
import { SetCopyMoveSuccess } from '@boards/store/ui';

@Component({
  selector: 'boards-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent
  implements AfterViewInit, OnChanges, OnDestroy, OnInit {
  private _styles;

  scroll: any;
  
  ROLE_ADMIN = UserRole.ADMIN;
  BOARD_MEMBER = BoardRole.MEMBER;
  BOARD_OWNER = BoardRole.OWNER;

  boardId: string;

  board$: Observable<IBoard>;
  boardCards$: Observable<ICard[]>;
  boardLists$: Observable<IList[]>;
  currentBoardRoles$: Observable<BoardRole[]>;
  currentUser$: Observable<IUser>;
  showBoardFilter$: Observable<boolean>;
  users$: Observable<IUser[]>;

  boardSubscription: Subscription;
  boardChannelSubscription: Subscription;

  dropSubscriptionCard: Subscription;
  dropSubscriptionList: Subscription;

  @ViewChild(`listsContent`, {static: false})
  listsContent: ElementRef;

  get themeColor() {
    return this._styles;
  }

  set themeColor(color: any) {
    this._styles = {
      'background-color': color
    };
  }

  constructor(
    @Inject(DOCUMENT) private document: any,
    private activatedRoute: ActivatedRoute,
    private dragulaService: DragulaService,
    private store: Store<IState>,
    private titleService: Title,
    private pageScrollService: PageScrollService,
    private signalrService: SignalrService,
    private themeService: ThemeService
  ) {}

  ngOnChanges() {
    this.boardId = this.activatedRoute.snapshot.params['boardId'];
  }

  ngOnInit() {
    this.boardId = this.activatedRoute.snapshot.params['boardId'];

    // Start SignalR connection
    this.boardChannelSubscription = this.signalrService.startBoardChannelHub(
      this.boardId
    );

    this.board$ = this.store.pipe(select((state: IState) => state.board));

    this.boardCards$ = this.store.pipe(
      select((state: IState) => state.board.cards)
    );
    this.boardLists$ = this.store.pipe(
      select((state: IState) => state.board.lists),
      map((lists: IList[]) => {
        return [...lists].sort((a, b) => {
          return a.positionOnBoard > b.positionOnBoard ? 1 : -1;
        });
      })
    );

    this.currentBoardRoles$ = this.store.pipe(
      select((state: IState) => state.users.currentBoardRoles)
    );
    this.currentUser$ = this.store.pipe(
      select((state: IState) => state.users.currentUser)
    );
    this.users$ = this.store.pipe(select((state: IState) => state.users.all));

    this.showBoardFilter$ = this.store.pipe(
      select((state: IState) => state.boardFilter),
      map((boardFilter: IBoardFilter) => {
        return (
          boardFilter.labels.length > 0 || boardFilter.boardUsers.length > 0
        );
      })
    );

    this.boardSubscription = this.board$.subscribe((board) => {
      this.store.dispatch(new SetCopyMoveSuccess({ board }));
      const theme = this.themeService.themes[board.summary.colorScheme];
      if (theme) {
        this.themeColor = theme.backgroundColor;
      }
      this.titleService.setTitle(`${board.summary.title} - queo boards`);
    });

    this.setListBagOptions();
    this.setCardBagOptions();

    this.dropSubscriptionCard = this.dragulaService.drop("card-bag").subscribe((value) => {
      this._moveCard(value.el, value.target, value.source, value.sibling);
    });
    this.dropSubscriptionList = this.dragulaService.drop("list-bag").subscribe((value) => {
      this._moveList(value.el, value.target, value.source, value.sibling);
    });
  }

  ngAfterViewInit() {
    const cardBag = this.dragulaService.find('card-bag');
    const listBag = this.dragulaService.find('list-bag');
    this.scroll = autoScroll(this.listsContent.nativeElement, {
      margin: 180,
      maxSpeed: 10,
      scrollWhenOutside: true,
      autoScroll: function() {
        return this.down && (cardBag.drake.dragging || listBag.drake.dragging);
      }
    });
  }

  setCardBagOptions() {
    // this is needed for nested drag and drop
    this.dragulaService.createGroup('card-bag', {
      removeOnSpill: false,
      moves: (el, source, handle, sibling) => {
        if (handle.classList) {
          return this._checkForClass(handle.classList, 'card');
        }
        return false;
      }
    });
  }

  setListBagOptions() {
    // this is needed for nested drag and drop
    this.dragulaService.createGroup('list-bag', {
      removeOnSpill: false,
      moves: (el, source, handle, sibling) => {
        if (handle.classList) {
          return !this._checkForClass(handle.classList, 'card');
        }
        return true;
      }
    });
  }

  private _checkForClass(classList, searchClass) {
    if (
      Array.from(classList).find((item) =>
        item.toString().includes(searchClass)
      ) === undefined
    ) {
      return false;
    } else {
      return true;
    }
  }

  _moveCard(el, target, source, sibling) {
    const sourceId = el.getAttribute('cardId');
    const targetId = target.getAttribute('listId');

    this.boardCards$
      .pipe(
        map((cards: ICard[]) =>
          cards.filter((card: ICard) => card.list.businessId === targetId)
        ),
        map((cards: ICard[]) => cards.map((card: ICard) => card.businessId)),
        take(1)
      )
      .subscribe((cardIds: string[]) => {
        if (sibling) {
          const index = cardIds.indexOf(sibling.getAttribute('cardId'));
          if (index === 0) {
            // first
            this.store.dispatch(
              new MoveCard({
                targetId,
                body: {
                  source: sourceId
                }
              })
            );
          } else {
            this.store.dispatch(
              new MoveCard({
                targetId,
                body: {
                  source: sourceId,
                  insertAfter: cardIds[index - 1]
                }
              })
            );
          }
        } else {
          if (cardIds.length > 0) {
            this.store.dispatch(
              new MoveCard({
                targetId,
                body: {
                  source: sourceId,
                  insertAfter: cardIds[cardIds.length - 1]
                }
              })
            );
          } else {
            this.store.dispatch(
              new MoveCard({
                targetId,
                body: {
                  source: sourceId
                }
              })
            );
          }
        }
      });
  }

  _moveList(el, target, source, sibling) {
    // get the list that was dragged
    const sourceId = el.getAttribute('listId');
    this.boardLists$
      .pipe(
        map((lists: IList[]) => lists.map((list: IList) => list.businessId)),
        take(1)
      )
      .subscribe((listIds: string[]) => {
        if (sibling) {
          const index = listIds.indexOf(sibling.getAttribute('listId'));
          this.store.dispatch(
            new MoveList({
              targetId: this.boardId,
              body: {
                source: sourceId,
                // has previous or not
                insertAfter: index === 0 ? null : listIds[index - 1]
              }
            })
          );
        } else {
          this.store.dispatch(
            new MoveList({
              targetId: this.boardId,
              body: {
                source: sourceId,
                // last list on board
                insertAfter: listIds[listIds.length - 1]
              }
            })
          );
        }
      });
  }

  ngOnDestroy() {
    this.signalrService.stopBoardChannelHub();
    this.boardChannelSubscription.unsubscribe();
    this.boardSubscription.unsubscribe();
    this.dropSubscriptionCard.unsubscribe();
    this.dropSubscriptionList.unsubscribe();
    this.dragulaService.destroy('list-bag');
    this.dragulaService.destroy('card-bag');

    this.scroll.destroy();

    this.resetBoardFilter();
  }

  handleCreateList(title: string) {
    this.store.dispatch(new AddList({ title, boardId: this.boardId }));

    const options: PageScrollOptions = {
      document: this.document,
      scrollTarget: '#createListScroll',
      scrollViews: [this.listsContent.nativeElement],
      // pageScrollOffset: -360,
      verticalScrolling: false
      // advancedInlineOffsetCalculation: true
    };

    this.pageScrollService.scroll(options);
  }

  handleUpdateBoardSummary(boardSummary: IBoardSummary) {
    this.store.dispatch(
      new UpdateBoardSummary({
        boardSummary,
        boardId: this.boardId
      })
    );
  }

  resetBoardFilter() {
    this.store.dispatch(new ResetFilter());
  }

  listTrackBy(index, item: IList) {
    return item !== null ? item.businessId : null;
  }
}
