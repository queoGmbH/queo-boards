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

import { IBoard, IList } from '@boards/core';

import { IState } from '@boards/store/state.interface';

import { SetCopyMove } from '@boards/store/ui';
import { MoveList } from '@boards/store/board';
import { AppStoreService } from '@boards/store/app-store.service';

@Component({
  selector: 'boards-move-list-menu',
  templateUrl: './move-list-menu.component.html',
  styleUrls: ['./move-list-menu.component.scss']
})
export class MoveListMenuComponent implements OnDestroy, OnInit {
  moveListForm: FormGroup;

  selectedBoard$: Observable<IBoard>;

  subscription: Subscription;

  boardSummaries$ = this.appStoreService.boardSummaries$;

  @Input()
  source: IList;

  @Output()
  actionDispatched = new EventEmitter();

  get lists() {
    if (this.selectedBoard$) {
      return this.selectedBoard$.pipe(
        map((board: IBoard) => {
          return board.lists.filter((list: IList) => {
            return list.businessId !== this.source.businessId;
          });
        })
      );
    }
  }

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
    this.moveListForm = this.fb.group({
      board: ['', Validators.required],
      list: ['', Validators.required]
    });
  }

  patchForm(board: IBoard) {
    this.moveListForm.patchValue({
      board: board.businessId,
      list: 0
    });
  }

  moveList() {
    const { board, list } = this.moveListForm.value;
    const targetId = board;
    let body = {};
    if (list !== 0) {
      body = {
        source: this.source.businessId,
        insertAfter: list
      };
    } else {
      body = {
        source: this.source.businessId
      };
    }
    this.store.dispatch(new MoveList({ targetId, body }));
    this.actionDispatched.emit();
  }

  handleBoardChange(boardId: string) {
    this.store.dispatch(new SetCopyMove({ boardId }));
  }
}
