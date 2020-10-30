import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { select, Store } from '@ngrx/store';

import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { IBoard, ICard, IList } from '@boards/core/interfaces';
import { IState } from '@boards/store/state.interface';

import { SetCopyMove } from '@boards/store/ui';
import { MoveCard } from '@boards/store/board';
import { AppStoreService } from '@boards/store/app-store.service';

@Component({
  selector: 'boards-move-card-menu',
  templateUrl: './move-card-menu.component.html',
  styleUrls: ['./move-card-menu.component.scss']
})
export class MoveCardMenuComponent implements OnDestroy, OnInit {
  moveCardForm: FormGroup;

  selectedBoard$: Observable<IBoard>;
  selectedListCards$: Observable<ICard[]>;

  subscription: Subscription;

  boardSummaries$ = this.appStoreService.boardSummaries$;

  @Input()
  source: ICard;

  @Output()
  actionDispatched = new EventEmitter<any>();

  constructor(
    private appStoreService: AppStoreService,
    private fb: FormBuilder,
    private store: Store<IState>
  ) {}

  ngOnInit() {
    this.initForm();
    this.selectedBoard$ = this.store.pipe(
      select((state: IState) => state.ui.copyMove)
    );
    this.subscription = this.selectedBoard$.subscribe((board: IBoard) => {
      if (board) {
        this.patchForm(board);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  initForm() {
    this.moveCardForm = this.fb.group({
      board: ['', Validators.required],
      list: ['', Validators.required],
      card: ['', Validators.required]
    });
  }

  patchForm(board: IBoard) {
    if (board.lists.length > 0) {
      const firstList: IList = board.lists[0];
      this.moveCardForm.patchValue({
        board: board.businessId,
        list: firstList.businessId,
        card: 0
      });
      this.handleListChange(firstList.businessId);
    } else {
      this.moveCardForm.patchValue({
        board: board.businessId,
        list: null,
        card: null
      });
    }
  }

  moveCard() {
    const { card, list } = this.moveCardForm.value;
    const targetId = list;
    let body = {};
    if (card !== 0) {
      body = {
        source: this.source.businessId,
        insertAfter: card
      };
    } else {
      body = {
        source: this.source.businessId
      };
    }
    this.store.dispatch(new MoveCard({ targetId, body }));
    this.actionDispatched.emit({ targetId, body });
  }

  handleBoardChange(boardId: string) {
    this.store.dispatch(new SetCopyMove({ boardId }));
  }

  handleListChange(listId: string) {
    this.selectedListCards$ = this.selectedBoard$.pipe(
      map((board: IBoard) => board.cards),
      map((cards: ICard[]) => {
        return cards.filter((card: ICard) => {
          return (
            card.list.businessId === listId &&
            card.businessId !== this.source.businessId
          );
        });
      })
    );
  }
}
