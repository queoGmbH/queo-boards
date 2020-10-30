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
import { filter, map, tap } from 'rxjs/operators';

import { IBoard, ICard } from '@boards/core/interfaces';
import { IState } from '@boards/store/state.interface';

import { SetCopyMove } from '@boards/store/ui';
import { CopyCard } from '@boards/store/board/board.action';
import { AppStoreService } from '@boards/store/app-store.service';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'boards-copy-card-menu',
  templateUrl: './copy-card-menu.component.html',
  styleUrls: ['./copy-card-menu.component.scss']
})
export class CopyCardMenuComponent implements OnInit, OnDestroy {
  copyCardForm: FormGroup;

  selectedBoard$: Observable<IBoard>;
  selectedListCards$: Observable<ICard[]>;

  boardSummaries$ = this.appStoreService.boardSummaries$;

  private unsubscribe$ = new Subject<void>();

  @Input()
  source: ICard;

  @Output()
  actionDispatched = new EventEmitter();

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
    this.selectedBoard$
      .pipe(
        filter((board) => !!board),
        tap((board) => {
          this.patchForm(board);
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  initForm() {
    this.copyCardForm = this.fb.group({
      board: ['', Validators.required],
      list: ['', Validators.required],
      card: ['', Validators.required],
      copyName: [`${this.source.title} (Kopie)`, Validators.required]
    });
  }

  patchForm(board: IBoard) {
    if (board.lists.length > 0) {
      this.copyCardForm.patchValue({
        board: board.businessId,
        list: board.lists[0].businessId,
        card: 0
      });
    } else {
      this.copyCardForm.patchValue({
        board: board.businessId,
        list: null
      });
    }
  }

  copyCard() {
    const { card, list, copyName } = this.copyCardForm.value;
    const targetId = list;
    let body = {};
    if (card !== 0) {
      body = {
        source: this.source.businessId,
        insertAfter: card,
        copyName
      };
    } else {
      body = {
        source: this.source.businessId,
        copyName
      };
    }
    this.store.dispatch(new CopyCard({ targetId, body }));
    this.actionDispatched.emit();
  }

  handleBoardChange(boardId: string) {
    this.store.dispatch(new SetCopyMove({ boardId }));
  }

  handleListChange(listId: string) {
    this.selectedListCards$ = this.selectedBoard$.pipe(
      map((board: IBoard) => board.cards),
      map((cards: ICard[]) => {
        return cards.filter((card: ICard) => {
          return card.list.businessId === listId;
        });
      })
    );
  }
}
