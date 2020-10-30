import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Observable } from 'rxjs';

import { select, Store } from '@ngrx/store';

import { IBoard, IBoardFilter, ILabel, IUser } from '@boards/core/interfaces';

import { IState } from '@boards/store/state.interface';

import {
  SetBoardUserFilter,
  SetLabelFilter,
  ResetFilter
} from '@boards/store/board-filter';

@Component({
  selector: 'boards-board-filter',
  templateUrl: './board-filter.component.html',
  styleUrls: ['./board-filter.component.scss']
})
export class BoardFilterComponent implements OnInit {
  board$: Observable<IBoard>;
  boardFilter$: Observable<IBoardFilter>;

  @ViewChild('memberSelect', {static: false})
  memberSelect: ElementRef;

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.board$ = this.store.pipe(select((state: IState) => state.board));
    this.boardFilter$ = this.store.pipe(
      select((state: IState) => state.boardFilter)
    );
  }

  handleBoardLabelSelect(labels: ILabel[]) {
    this.store.dispatch(new SetLabelFilter({ labels }));
  }

  handleBoardUserSelect(boardUsers: IUser[]) {
    this.store.dispatch(new SetBoardUserFilter({ boardUsers }));
  }

  resetFilter() {
    this.store.dispatch(new ResetFilter());
  }
}
