import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { first, takeUntil, tap } from 'rxjs/operators';

import { IBoardSummary } from '@boards/core/interfaces';

import { DialogService } from '@boards/core/services';

import { IState } from '@boards/store/state.interface';

import { AppStoreService } from '@boards/store/app-store.service';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'boards-template-create',
  templateUrl: './template-create.component.html',
  styleUrls: ['./template-create.component.scss']
})
export class TemplateCreateComponent implements OnInit, OnDestroy {
  template: IBoardSummary;

  template$: Observable<IBoardSummary>;

  private unsubscribe$ = new Subject<void>();

  @Input()
  value: boolean;

  constructor(
    private appStoreService: AppStoreService,
    private dialogService: DialogService,
    private store: Store<IState>
  ) {}

  ngOnInit() {
    this.template$ = this.store.pipe(
      select((state: IState) => state.board.summary)
    );

    this.template$
      .pipe(
        takeUntil(this.unsubscribe$),
        tap((template) => {
          this.template = template;
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  saveAsTemplate() {
    const dialogData = {
      title: 'Vorlage',
      message: `Board "${this.template.title}" als Vorlage speichern?`
    };

    this.dialogService
      .confirm(dialogData)
      .pipe(
        tap((confirm) => {
          if (confirm) {
            this.appStoreService.createBoardTemplate({
              template: this.template
            });
          }
        }),
        first()
      )
      .subscribe();
  }
}
