import { Injectable } from '@angular/core';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { Observable } from 'rxjs';

import { IConfirmDialogData, IErrorDialogData } from '../interfaces';

import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { ErrorDialogComponent } from '../components/error-dialog/error-dialog.component';

@Injectable()
export class DialogService {
  config: MatDialogConfig;
  dialogRef: MatDialogRef<ConfirmDialogComponent | ErrorDialogComponent>;

  constructor(private dialog: MatDialog) {}

  confirm(confirmDialogData: IConfirmDialogData): Observable<boolean> {
    this.config = <MatDialogConfig>{
      width: '400px',
      panelClass: 'dialog-confirm',
      data: confirmDialogData
    };

    this.dialogRef = this.dialog.open(ConfirmDialogComponent, this.config);

    return this.dialogRef.afterClosed();
  }

  error(errorDialogData: IErrorDialogData): Observable<boolean> {
    this.config = <MatDialogConfig>{
      width: '400px',
      panelClass: 'dialog-error',
      data: errorDialogData,
      disableClose: true
    };

    this.dialogRef = this.dialog.open(ErrorDialogComponent, this.config);

    return this.dialogRef.afterClosed();
  }
}
