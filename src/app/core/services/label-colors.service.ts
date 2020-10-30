import { Injectable } from '@angular/core';

import { ILabelColor } from '../interfaces/label-color.interface';

@Injectable()
export class LabelColorsService {
  private _labelColors: ILabelColor[];

  constructor() {
    this._labelColors = [
      {
        id: '1',
        name: 'Labelcolor 1',
        color: 'rgb(255,228,0)'
      },
      {
        id: '2',
        name: 'Labelcolor 2',
        color: 'rgb(176,181,2)'
      },
      {
        id: '3',
        name: 'Labelcolor 3',
        color: 'rgb(163,204,234)'
      },
      {
        id: '4',
        name: 'Labelcolor 4',
        color: 'rgb(238,127,54)'
      },
      {
        id: '5',
        name: 'Labelcolor 5',
        color: 'rgb(213,240,204)'
      },
      {
        id: '6',
        name: 'Labelcolor 6',
        color: 'rgb(0,74,153)'
      },
      {
        id: '7',
        name: 'Labelcolor 7',
        color: 'rgb(189,18,32)'
      },
      {
        id: '8',
        name: 'Labelcolor 8',
        color: 'rgb(107,205,151)'
      },
      {
        id: '9',
        name: 'Labelcolor 9',
        color: 'rgb(0,0,0)'
      },
      {
        id: '10',
        name: 'Labelcolor 10',
        color: 'rgb(0,112,63)'
      }
    ];
  }

  getAll() {
    return this._labelColors;
  }

  getColor(id: string): string {
    return this._labelColors.find((labelColor) => {
      return labelColor.id === id;
    }).color;
  }
}
