import { Component, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { IBoard, ILabel, ILabelColor } from '@boards/core/interfaces';

import { IState } from '@boards/store/state.interface';

import { DialogService, LabelColorsService } from '@boards/core/services';

import {
  CreateBoardLabel,
  UpdateBoardLabel,
  RemoveBoardLabel
} from '@boards/store/board';

@Component({
  selector: 'boards-board-labels',
  templateUrl: './board-labels.component.html',
  styleUrls: ['./board-labels.component.scss']
})
export class BoardLabelsComponent implements OnInit {
  board$: Observable<IBoard>;

  selectedBoardLabel: ILabel;

  labelColors: ILabelColor[];

  editBoardLabel: boolean;

  constructor(
    private dialogService: DialogService,
    private labelColorsService: LabelColorsService,
    private store: Store<any>
  ) {}

  ngOnInit() {
    this.labelColors = this.labelColorsService.getAll();
    this.editBoardLabel = false;
    this.board$ = this.store.pipe(select((state: IState) => state.board));
  }

  handleCreateBoardLabel(data) {
    let { label }: { label: ILabel } = data;
    this.board$.pipe(take(1)).subscribe((board: IBoard) => {
      label = {
        ...label,
        board: {
          businessId: board.businessId,
          title: board.summary.title
        }
      };
      this.store.dispatch(new CreateBoardLabel({ label }));
    });
  }

  handleUpdateBoardLabel(label: ILabel) {
    this.store.dispatch(new UpdateBoardLabel({ label }));
    this.editBoardLabel = false;
  }

  handleRemoveBoardLabel(label: ILabel) {
    const dialogData = {
      title: 'Label',
      message: 'Label löschen?'
    };

    this.dialogService
      .confirm(dialogData)
      .pipe(take(1))
      .subscribe((confirm) => {
        if (confirm) {
          this.store.dispatch(new RemoveBoardLabel({ label }));
          this.editBoardLabel = false;
        }
      });
  }

  toggleEditBoardLabel(label: ILabel) {
    this.selectedBoardLabel = label;
    this.editBoardLabel = true;
  }

  handleResetEdit() {
    if (this.editBoardLabel) {
      this.editBoardLabel = false;
    }
  }
}
