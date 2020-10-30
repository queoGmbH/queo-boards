import { Pipe, PipeTransform } from '@angular/core';

import * as compareAsc from 'date-fns/compare_asc';
import * as compareDesc from 'date-fns/compare_desc';

import { SortOrder } from '@boards/core/enums';

@Pipe({
  name: 'sortDate'
})
export class SortDatePipe implements PipeTransform {
  constructor() {}

  transform(values: any[], sortOrder = SortOrder.DESC): any {
    if (values) {
      switch (sortOrder) {
        case SortOrder.DESC:
          return values.sort((a, b) => compareDesc(a.createdAt, b.createdAt));
        case SortOrder.ASC:
          return values.sort((a, b) => compareAsc(a.createdAt, b.createdAt));
      }
    }

    return null;
  }
}
