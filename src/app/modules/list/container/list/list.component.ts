import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { Router } from '@angular/router';
import { MatMenuTrigger } from '@angular/material/menu';

import { select, Store } from '@ngrx/store';

import { Observable, Subject, combineLatest } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';

import { DragulaService } from 'ng2-dragula';

import autoScroll from 'dom-autoscroller';

import {
  IBoard,
  IBoardFilter,
  ICard,
  ILabel,
  IList,
  IUser
} from '@boards/core/interfaces';
import { BoardActions } from '@boards/core/enums';

import { IState } from '@boards/store/state.interface';

import {
  AddCard,
  UpdateList,
  ArchiveList,
  AddCardAndOpen
} from '@boards/store/board';

@Component({
  selector: 'boards-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements AfterViewInit, OnDestroy, OnInit {
  scroll: any;

  showCopyListMenu = false;
  showMoveListMenu = false;
  showMainListMenu = true;

  action = BoardActions;
  board: IBoard;

  board$: Observable<IBoard>;
  boardId: string;
  boardFilter$: Observable<IBoardFilter>;
  cards$: Observable<ICard[]>;

  filteredCards$: Observable<ICard[]>;

  private unsubscribe$ = new Subject<void>();

  @Input()
  list: IList;
  @Input()
  listCount: number;

  @ViewChild(`listContent`, {static: false})
  listContent: ElementRef;
  @ViewChild(MatMenuTrigger, {static: true})
  trigger: MatMenuTrigger;

  constructor(
    private dragulaService: DragulaService,
    private router: Router,
    private store: Store<IState>
  ) {}

  ngOnInit() {
    this.board$ = this.store.pipe(select((state: IState) => state.board));
    this.boardFilter$ = this.store.pipe(
      select((state: IState) => state.boardFilter)
    );
    this.cards$ = this.store.pipe(select((state: IState) => state.board.cards));

    this.board$
      .pipe(
        takeUntil(this.unsubscribe$),
        tap((board) => {
          this.boardId = board.businessId;
        })
      )
      .subscribe();

    this.filteredCards$ = combineLatest(this.boardFilter$, this.cards$).pipe(
      map(([boardFilter, cards]) => {
        const {
          labels,
          boardUsers
        }: { labels: ILabel[]; boardUsers: IUser[] } = boardFilter;
        cards = cards.filter((card) => {
          return card.list.businessId === this.list.businessId;
        });

        if (labels.length > 0) {
          cards = this.filterLabels(cards, labels);
        }

        if (boardUsers.length > 0) {
          cards = this.filterBoardUsers(cards, boardUsers);
        }
        return cards.sort((a, b) => (a.position > b.position ? 1 : -1));
      })
    );

    this.trigger.menuClosed
      .pipe(
        takeUntil(this.unsubscribe$),
        tap(() => {
          this.reset();
        })
      )
      .subscribe();
  }

  ngAfterViewInit() {
    const cardBag = this.dragulaService.find('card-bag');
    this.scroll = autoScroll(this.listContent.nativeElement, {
      margin: 40,
      maxSpeed: 10,
      scrollWhenOutside: false,
      autoScroll: function() {
        return this.down && cardBag.drake.dragging;
      }
    });
  }

  ngOnDestroy() {
    this.scroll.destroy();

    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  filterLabels(cards: ICard[], labels: ILabel[]): ICard[] {
    return cards
      .filter((card: ICard) => {
        return card.assignedLabels.length > 0;
      })
      .filter((card: ICard) => {
        return card.assignedLabels.find((cardLabel: ILabel) => {
          const foundLabel = labels.find((boardLabel: ILabel) => {
            return cardLabel.businessId === boardLabel.businessId;
          });
          return !!foundLabel;
        });
      });
  }

  filterBoardUsers(cards: ICard[], boardUsers: IUser[]): ICard[] {
    return cards
      .filter((card) => {
        return card.assignedUsers.length > 0;
      })
      .filter((card) => {
        return card.assignedUsers.find((cardMember: IUser) => {
          const foundMember = boardUsers.find((boardMember: IUser) => {
            return cardMember.businessId === boardMember.businessId;
          });
          return !!foundMember;
        });
      });
  }

  handleCreateCard(title: string) {
    this.store.dispatch(new AddCard({ title, list: this.list }));
  }

  handleCreateAndOpenCard(title: string) {
    this.store.dispatch(new AddCardAndOpen({ title, list: this.list }));
  }

  handleUpdateListTitle(title: string) {
    this.store.dispatch(new UpdateList({ title, list: this.list }));
  }

  archiveList(list: IList) {
    this.store.dispatch(
      new ArchiveList({ listId: list.businessId, value: true })
    );
  }

  handleCloseMenu(event: MouseEvent) {
    event.stopPropagation();
    this.trigger.closeMenu();
  }

  toggleCopy(event: MouseEvent) {
    event.stopPropagation();
    this.showMainListMenu = false;
    this.showMoveListMenu = false;
    this.showCopyListMenu = true;
  }

  toggleMove(event: MouseEvent) {
    event.stopPropagation();
    this.showMainListMenu = false;
    this.showCopyListMenu = false;
    this.showMoveListMenu = true;
  }

  handleShowMainMenu(event: MouseEvent) {
    event.stopPropagation();
    this.reset();
  }

  closeMenu() {
    this.showMoveListMenu = false;
    this.showCopyListMenu = false;
  }

  reset() {
    this.showCopyListMenu = false;
    this.showMoveListMenu = false;
    this.showMainListMenu = true;
  }

  trackByBusinessId(index, item: ICard) {
    return item !== null ? item.businessId : null;
  }
}
