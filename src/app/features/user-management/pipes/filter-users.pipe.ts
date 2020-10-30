import { Pipe, PipeTransform } from '@angular/core';

import { IUser } from '@boards/core/interfaces';

@Pipe({ name: 'filterUser' })
export class FilterUserPipe implements PipeTransform {
  transform(users: IUser[], substring: string) {
    if (!users) {
      return null;
    }

    if (substring === '') {
      return users;
    }

    return users.filter((user) => {
      const nameString = (
        user.firstname +
        ' ' +
        user.lastname +
        ' ' +
        user.name
      ).toLowerCase();
      return nameString.includes(substring.toLowerCase());
    });
  }
}
