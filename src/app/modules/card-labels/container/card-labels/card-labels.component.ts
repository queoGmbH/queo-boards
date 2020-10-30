import { Component, Input, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { IBoard, ICard, ILabel, ILabelColor } from '@boards/core/interfaces';

import { LabelColorsService } from '@boards/core/services';

import { IState } from '@boards/store/state.interface';

import {
  RemoveCardLabel,
  UpdateCardLabel,
  CreateBoardLabel
} from '@boards/store/board';

@Component({
  selector: 'boards-card-labels',
  templateUrl: './card-labels.component.html',
  styleUrls: ['./card-labels.component.scss']
})
export class CardLabelsComponent implements OnInit {
  labelColors: ILabelColor[];

  board$: Observable<IBoard>;

  @Input()
  card: ICard;

  constructor(
    private labelColorsService: LabelColorsService,
    private store: Store<IState>
  ) {}

  ngOnInit() {
    this.labelColors = this.labelColorsService.getAll();
    this.board$ = this.store.pipe(select((state: IState) => state.board));
  }

  handleBoardLabelSelect(label: ILabel) {
    const assigned = this.card.assignedLabels.find((assignedLabel: ILabel) => {
      return assignedLabel.businessId === label.businessId;
    });

    if (assigned) {
      this.store.dispatch(
        new RemoveCardLabel({
          label,
          card: this.card
        })
      );
    } else {
      this.store.dispatch(
        new UpdateCardLabel({
          label,
          card: this.card
        })
      );
    }
  }

  handleCreateBoardLabel(label: ILabel) {
    this.board$.pipe(take(1)).subscribe((board: IBoard) => {
      this.store.dispatch(
        new CreateBoardLabel({
          label: {
            ...label,
            board: {
              businessId: board.businessId
            }
          }
        })
      );
    });
  }

  trackByCardLabel(index, item: ILabel) {
    return item !== null ? item.businessId : null;
  }
}
