import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { filter, first, tap } from 'rxjs/operators';

import { IBoardSummary } from '@boards/core';
import { DialogService } from '@boards/core/services';

import { AppStoreService } from '@boards/store/app-store.service';

@Component({
  selector: 'boards-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplatesComponent implements OnInit {
  boardTemplates$ = this.appStoreService.boardTemplates$;

  constructor(
    private appStoreService: AppStoreService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {}

  handleTemplateRemove(template: IBoardSummary) {
    const dialogData = {
      title: 'Board Vorlagen',
      message: `Vorlage "${template.title}" entfernen?`
    };

    this.dialogService
      .confirm(dialogData)
      .pipe(
        tap((confirm) => {
          if (confirm) {
            this.appStoreService.removeBoardTemplate({ template });
          }
        }),
        first()
      )
      .subscribe();
  }
}
