import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

import { IBoardSummary } from '../../../../core/interfaces/board-summary.interface';

@Component({
  selector: 'boards-create-board-dialog',
  templateUrl: './create-board-dialog.component.html',
  styleUrls: ['./create-board-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateBoardDialogComponent implements OnInit {
  formData: IBoardSummary;
  formValid: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<CreateBoardDialogComponent>
  ) {}

  ngOnInit() {
    this.formValid = false;
  }

  createBoard() {
    if (this.formValid) {
      return this.formData;
    }
  }

  handleFormChange(event: any) {
    this.formData = event.formData;
    this.formValid = event.valid;
  }
}
