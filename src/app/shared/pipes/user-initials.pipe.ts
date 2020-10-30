import { Pipe, PipeTransform } from '@angular/core';

import { IUser } from '@boards/core/interfaces';

@Pipe({
  name: 'userInitials'
})
export class UserInitialsPipe implements PipeTransform {
  transform(value: IUser, args?: any): string {
    if (value) {
      if (value === null) {
        return '';
      }

      if (value.firstname === null || value.lastname === null) {
        return value.name.substr(0, 2).toUpperCase();
      }

      return `${value.firstname
        .substr(0, 1)
        .toUpperCase()}${value.lastname.substr(0, 1).toUpperCase()}`;
    }
  }
}
