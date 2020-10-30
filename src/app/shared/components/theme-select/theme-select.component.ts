import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';

import { ITheme, IThemeColor } from '@boards/core/interfaces';

import { ThemeService } from '@boards/core/services';

@Component({
  selector: 'boards-theme-select',
  templateUrl: './theme-select.component.html',
  styleUrls: ['./theme-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeSelectComponent implements OnInit {
  themes: ITheme;

  private _defaultTheme = 'Theme 1';
  private _selectedTheme: string;

  @Input()
  get selectedTheme() {
    return this._selectedTheme;
  }

  set selectedTheme(theme: string) {
    this._selectedTheme = theme;
  }

  @Output()
  themeSelect = new EventEmitter<string>();

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.themes = this.themeService.themes;

    if (!this.selectedTheme) {
      this._selectedTheme = this._defaultTheme;
      this.themeSelect.emit(this._selectedTheme);
    }
  }

  colorStyles(theme: string) {
    const { backgroundColor, borderColor } = <IThemeColor>this.themes[theme];
    return {
      backgroundColor,
      borderColor
    };
  }

  onThemeSelect(theme: string) {
    this._selectedTheme = theme;
    this.themeSelect.emit(theme);
  }
}
