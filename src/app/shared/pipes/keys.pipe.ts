import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keys'
})
export class KeysPipe implements PipeTransform {
  constructor() {}

  transform(value: any, args?: any): any {
    if (value) {
      const keys = [];
      for (const key in value) {
        if (value.hasOwnProperty(key)) {
          keys.push(key);
        }
      }
      return keys;
    }
  }
}
