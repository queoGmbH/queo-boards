import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { IConfirmDialogData } from '../../interfaces/confirm-dialog-data.interface';

@Component({
  selector: 'boards-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  title: string;
  message: string;
  textCancel: string;
  textOk: string;

  constructor(@Inject(MAT_DIALOG_DATA) private data: IConfirmDialogData) {}

  ngOnInit() {
    this.title = this.data.title;
    this.message = this.data.message;
    this.textCancel = this.data.textCancel || 'Abbrechen';
    this.textOk = this.data.textOk || 'Ja';
  }
}
