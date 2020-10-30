import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';

import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatMenuTrigger } from '@angular/material/menu';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { IBoard, ILabel, ILabelColor } from '@boards/core/interfaces';

import { IState } from '@boards/store/state.interface';

@Component({
  selector: 'boards-board-label-select',
  templateUrl: './board-label-select.component.html',
  styleUrls: ['./board-label-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardLabelSelectComponent implements OnInit {
  addLabel = false;

  board$: Observable<IBoard>;

  @Input()
  cardLabels: ILabel[];
  @Input()
  labelColors: ILabelColor[];

  @Output()
  boardLabelSelect = new EventEmitter<ILabel>();
  @Output()
  createBoardLabel = new EventEmitter<ILabel>();

  @ViewChild(MatMenuTrigger, {static: false})
  boardLabelSelectTrigger: MatMenuTrigger;

  constructor(private store: Store<IState>) {}

  ngOnInit() {
    this.board$ = this.store.pipe(select((state: IState) => state.board));
  }

  isCardLabel(boardLabel: ILabel) {
    const found = this.cardLabels.find((cardLabel) => {
      return cardLabel.businessId === boardLabel.businessId;
    });
    return !!found;
  }

  onBoardLabelSelect(event: MatButtonToggleChange) {
    this.boardLabelSelect.emit(event.value);
  }

  toggleCreateBoardLabel(event: MouseEvent) {
    event.stopPropagation();
    this.addLabel = true;
  }

  cancelCreateLabel(event?: MouseEvent) {
    if (event instanceof MouseEvent) {
      event.stopPropagation();
    }
    this.board$.pipe(take(1)).subscribe((board: IBoard) => {
      if (board.labels.length > 0) {
        this.addLabel = false;
      } else {
        this.boardLabelSelectTrigger.closeMenu();
      }
    });
  }

  handleCreateBoardLabel(data) {
    const { label, event } = data;
    event.stopPropagation();
    this.addLabel = false;
    this.createBoardLabel.emit(label);
  }

  onBoardLabelSelectMenuClose() {
    this.board$.pipe(take(1)).subscribe((board: IBoard) => {
      if (board.labels.length > 0) {
        this.addLabel = false;
      }
    });
  }
}
