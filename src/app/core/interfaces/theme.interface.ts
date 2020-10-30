import { IThemeColor } from './theme-color.interface';

export interface ITheme {
  [name: string]: IThemeColor;
}
