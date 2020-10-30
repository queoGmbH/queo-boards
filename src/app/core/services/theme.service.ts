import { Injectable } from '@angular/core';

import { ITheme } from '../interfaces';

@Injectable()
export class ThemeService {
  private _themes: ITheme;

  constructor() {
    this._themes = {
      'Theme 1': {
        backgroundColor: 'rgb(255,244,177)',
        borderColor: 'rgb(255,228,0)'
      },
      'Theme 2': {
        backgroundColor: 'rgb(213,240,204)',
        borderColor: 'rgb(107,205,151)'
      },
      'Theme 3': {
        backgroundColor: 'rgb(251,207,161)',
        borderColor: 'rgb(238,127,0)'
      },
      'Theme 4': {
        backgroundColor: 'rgb(246,181,159)',
        borderColor: 'rgb(189,18,32)'
      },
      'Theme 5': {
        backgroundColor: 'rgb(204,232,214)',
        borderColor: 'rgb(0,144,54)'
      },
      'Theme 6': {
        backgroundColor: 'rgb(164,190,167)',
        borderColor: 'rgb(0,112,63)'
      },
      'Theme 7': {
        backgroundColor: 'rgb(221,235,247)',
        borderColor: 'rgb(163,204,234)'
      },
      'Theme 8': {
        backgroundColor: 'rgb(191,191,191)',
        borderColor: 'rgb(0,0,0)'
      }
    };
  }

  get themes() {
    return this._themes;
  }
}
