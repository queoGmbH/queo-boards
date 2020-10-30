import { Pipe, PipeTransform } from '@angular/core';

import * as deLocale from 'date-fns/locale/de/index.js';
import * as format from 'date-fns/format';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {
  constructor() {}

  transform(value: string, args?: any): string {
    if (value) {
      return format(new Date(value), 'D. MMM. [um] HH:mm', {
        locale: deLocale
      });
    }
  }
}
