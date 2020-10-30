import { Pipe, PipeTransform } from '@angular/core';

import { ThemeService } from '@boards/core/services';

@Pipe({
  name: 'borderColor'
})
export class BorderColorPipe implements PipeTransform {
  constructor(private themeService: ThemeService) {}

  transform(value: string, args?: any): any {
    if (value) {
      if (this.themeService.themes[value]) {
        return this.themeService.themes[value].borderColor;
      }
    }
  }
}
