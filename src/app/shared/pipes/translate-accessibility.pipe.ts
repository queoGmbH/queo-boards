import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translateAccessibility'
})
export class TranslateAccessibilityPipe implements PipeTransform {
  constructor() {}

  transform(value: string, args?: any): any {
    if (value) {
      switch (value) {
        case 'Public':
          return 'Öffentlich';
        case 'Restricted':
          return 'Eingeschränkt';
        default:
          return 'ERROR';
      }
    }
  }
}
