import { Pipe, PipeTransform } from '@angular/core';

import * as deLocale from 'date-fns/locale/de/index.js';

import * as format from 'date-fns/format';

import * as getDate from 'date-fns/get_date';
import * as getHours from 'date-fns/get_hours';
import * as getMinutes from 'date-fns/get_minutes';
import * as getMonth from 'date-fns/get_month';
import * as getSeconds from 'date-fns/get_seconds';
import * as getYear from 'date-fns/get_year';

@Pipe({
  name: 'commentDate'
})
export class CommentDatePipe implements PipeTransform {
  static utcDate(date: Date) {
    return new Date(
      Date.UTC(
        getYear(date),
        getMonth(date),
        getDate(date),
        getHours(date),
        getMinutes(date),
        getSeconds(date)
      )
    );
  }

  constructor() {}

  transform(value: string, args?: any): string {
    if (value) {
      return format(
        CommentDatePipe.utcDate(new Date(value)),
        'D. MMM. [um] HH:mm',
        {
          locale: deLocale
        }
      );
    }
  }
}
