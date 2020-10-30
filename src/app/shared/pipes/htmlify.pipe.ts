import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'htmlify'
})
export class HtmlifyPipe implements PipeTransform {
  transform(value: string, args?: any): any {
    if (value) {
      return value.replace(/\r?\n/g, '<br />');
    } else {
      return 'Hinzufügen...';
    }
  }
}
