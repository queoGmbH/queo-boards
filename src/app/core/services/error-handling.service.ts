// we want console logs in this service
/* tslint:disable no-console */

import { ApplicationRef, Injectable, Injector } from '@angular/core';
import { IErrorDialogData } from '../interfaces/error-dialog-data.interface';
import { DialogService } from './dialog.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class ErrorHandlingService {
  private _swallowErrors = false;

  private _showErrorDialog(dialogData: IErrorDialogData): void {
    // acquire ApplicationRef imperatively
    // @ref https://stackoverflow.com/a/37793791/1146207
    window.setTimeout(() => {
      // inject dependencies
      const applicationRef: ApplicationRef = this.injector.get(ApplicationRef);

      // show error dialog
      this.dialogService.error(dialogData);

      // force change detection after error catch
      // @ref https://stackoverflow.com/a/37793791/1146207
      applicationRef.tick();
    });
  }

  get swallowErrors(): boolean {
    return this._swallowErrors;
  }

  constructor(
    private injector: Injector,
    private dialogService: DialogService
  ) {}

  /**
   * swallows all future errors, i.e. do not escalate them any more
   */
  swallowAllErrors(): void {
    console.warn('Silently now ignoring all errors...');
    this._swallowErrors = true;
  }

  /**
   * stops swallowing errors...
   */
  stopSwallowing(): void {
    console.info('Stopped ignoring/*/**/*/ all errors...');
    this._swallowErrors = false;
  }

  showGenericErrorDialog(error: any): void {
    // set dialog options
    const dialogData: IErrorDialogData = {
      title: 'Fehler',
      message:
        'Es ist ein allgemeiner Fehler aufgetreten, bitte laden Sie die Anwendung neu um fortzufahren',
      errorMessage: error.message ? error.message : error.toString(),
      showError: environment.showErrorMessage
    };
    this._showErrorDialog(dialogData);
  }

  /**
   * shows a specific errorDialog for AccessDenied
   */
  showAccessDeniedErrorDialog(): void {
    // set dialog options
    const dialogData: IErrorDialogData = {
      title: 'Zugriff verweigert',
      message: 'Für diese Funktion haben Sie keine Berechtigung.',
      showError: false
    };
    this._showErrorDialog(dialogData);
  }
}
