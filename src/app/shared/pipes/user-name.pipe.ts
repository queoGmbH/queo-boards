import { Pipe, PipeTransform } from '@angular/core';

import { IUser } from '@boards/core/interfaces';

@Pipe({
  name: 'userName'
})
export class UserNamePipe implements PipeTransform {
  transform(value: IUser, args?: any): string {
    if (value) {
      if (value === null) {
        return '';
      }

      if (value.firstname === null || value.lastname === null) {
        return value.name;
      }

      return `${value.firstname} ${value.lastname}`;
    }
  }
}
