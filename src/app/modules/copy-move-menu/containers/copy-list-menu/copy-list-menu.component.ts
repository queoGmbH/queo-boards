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

import { IBoard, IList } from '@boards/core/interfaces';
import { IState } from '@boards/store/state.interface';

import { SetCopyMove } from '@boards/store/ui';
import { CopyList } from '@boards/store/board';
import { AppStoreService } from '@boards/store/app-store.service';

@Component({
  selector: 'boards-copy-list-menu',
  templateUrl: './copy-list-menu.component.html',
  styleUrls: ['./copy-list-menu.component.scss']
})
export class CopyListMenuComponent implements OnDestroy, OnInit {
  copyListForm: FormGroup;

  selectedBoard$: Observable<IBoard>;

  subscription: Subscription;

  boardSummaries$ = this.appStoreService.boardSummaries$;

  @Input()
  source: IList;

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
    this.copyListForm = this.fb.group({
      board: ['', Validators.required],
      list: ['', Validators.required],
      copyName: [`${this.source.title} (Kopie)`, Validators.required]
    });
  }

  patchForm(board: IBoard) {
    this.copyListForm.patchValue({
      board: board.businessId,
      list: 0
    });
  }

  copyList() {
    const { board, list, copyName } = this.copyListForm.value;
    const targetId = board;
    let body = {};
    if (list !== 0) {
      body = {
        source: this.source.businessId,
        insertAfter: list,
        copyName
      };
    } else {
      body = {
        source: this.source.businessId,
        copyName
      };
    }
    this.store.dispatch(new CopyList({ targetId, body }));
    this.actionDispatched.emit();
  }

  handleBoardChange(boardId: string) {
    this.store.dispatch(new SetCopyMove({ boardId }));
  }
}
