import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';

import { IBoard, ILabel } from '@boards/core/interfaces';

@Component({
  selector: 'boards-board-label-toggle',
  templateUrl: './board-label-toggle.component.html',
  styleUrls: ['./board-label-toggle.component.scss']
})
export class BoardLabelToggleComponent implements OnInit {
  @Input()
  board: IBoard;
  @Input()
  selectedLabels: ILabel[];

  @Output()
  boardLabelSelect = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  getSelected(boardLabel: ILabel) {
    return this.selectedLabels.find((label) => {
      return boardLabel.businessId === label.businessId;
    });
  }

  onBoardLabelSelect(event: MatButtonToggleChange) {
    const selected = event.source.checked;
    const boardLabel: ILabel = event.value;

    if (selected) {
      this.selectedLabels = [...this.selectedLabels, boardLabel];
    } else {
      this.selectedLabels = [
        ...this.selectedLabels.filter((label) => {
          return label.businessId !== boardLabel.businessId;
        })
      ];
    }

    this.boardLabelSelect.emit(this.selectedLabels);
  }
}
