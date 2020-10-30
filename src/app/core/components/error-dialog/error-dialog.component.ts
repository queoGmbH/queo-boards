import { environment } from '../../../../environments/environment';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { IErrorDialogData } from '../../interfaces/error-dialog-data.interface';

@Component({
  selector: 'boards-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss']
})
export class ErrorDialogComponent implements OnInit {
  title: string;
  message: string;
  errorMessage: string;
  textReload?: string;
  showErrorMessage: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) private data: IErrorDialogData) {}

  ngOnInit() {
    this.title = this.data.title;
    this.message = this.data.message;
    this.textReload = this.data.textReload || 'Anwendung neu laden';
    this.showErrorMessage = this.data.showError;
    this.errorMessage = this.data.errorMessage || '';
  }

  reload() {
    window.location.reload(true);
  }
}
