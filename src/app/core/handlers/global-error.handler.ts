// we want console logs in this service
/* tslint:disable no-console */
import { ErrorHandler, Injectable, Injector } from '@angular/core';

import { ErrorHandlingService } from '../services';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(error: any) {
    const errorHandling: ErrorHandlingService = this.injector.get(
      ErrorHandlingService
    );
    // only handle errors if we are not to silently swallow them all...

    if (!errorHandling.swallowErrors) {
      errorHandling.showGenericErrorDialog(error);
      // rethrow the error otherwise it gets swallowed
      throw error;
    } else {
      console.error('ignored error:', error);
    }
  }
}
