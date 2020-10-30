import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {
  constructor() {}

  transform(arr: any[]): any[] {
    if (arr) {
      return [...arr].reverse();
    }
  }
}
