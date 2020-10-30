import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { ICardChecklist, ICardChecklistState } from '@boards/core/interfaces';

import { DialogService } from '@boards/core/services';

import {
  UpdateCardChecklistTitle,
  RemoveCardChecklist
} from '@boards/store/card-checklist';

@Component({
  selector: 'boards-card-detail-checklist',
  templateUrl: './card-detail-checklist.component.html',
  styleUrls: ['./card-detail-checklist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardDetailChecklistComponent implements OnDestroy, OnInit {
  cardChecklist$: Observable<ICardChecklist>;
  cardChecklist: ICardChecklist;

  subscription: Subscription;

  @Input()
  cardChecklistId: string;

  constructor(
    private dialogService: DialogService,
    private store: Store<any>
  ) {}

  ngOnInit() {
    this.cardChecklist$ = this.store.select('cardChecklists').pipe(
      map((cardChecklists: ICardChecklistState) => {
        return cardChecklists.checklists.find((checklist) => {
          return checklist.businessId === this.cardChecklistId;
        });
      })
    );

    this.subscription = this.cardChecklist$.subscribe((cardChecklist) => {
      this.cardChecklist = cardChecklist;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onUpdateCardChecklistTitle(cardChecklistTitle: string) {
    this.store.dispatch(
      new UpdateCardChecklistTitle({
        cardChecklistId: this.cardChecklistId,
        cardChecklistTitle
      })
    );
  }

  onRemoveCardChecklist() {
    const dialogData = {
      title: 'Checkliste',
      message: `Möchten Sie die Checkliste "${
        this.cardChecklist.title
      }" löschen?`
    };

    this.dialogService
      .confirm(dialogData)
      .pipe(take(1))
      .subscribe((confirm) => {
        if (confirm) {
          this.store.dispatch(
            new RemoveCardChecklist({ cardChecklist: this.cardChecklist })
          );
        }
      });
  }
}
