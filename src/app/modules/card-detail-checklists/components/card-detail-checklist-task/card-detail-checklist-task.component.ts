import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';

import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { select, Store } from '@ngrx/store';

import {
  ICardChecklistTask,
  ICardChecklistState
} from '@boards/core/interfaces';

import { IState } from '@boards/store/state.interface';

import {
  UpdateCardChecklistTask,
  RemoveCardChecklistTask
} from '@boards/store/card-checklist';

@Component({
  selector: 'boards-card-detail-checklist-task',
  templateUrl: './card-detail-checklist-task.component.html',
  styleUrls: ['./card-detail-checklist-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardDetailChecklistTaskComponent implements OnDestroy, OnInit {
  cardChecklistTask$: Observable<ICardChecklistTask>;
  cardChecklistTask: ICardChecklistTask;

  subscription: Subscription;

  @Input()
  cardId: string;
  @Input()
  cardChecklistTaskId: string;

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.cardChecklistTask$ = this.store.pipe(
      select((state: IState) => state.cardChecklists),
      map((cardChecklists: ICardChecklistState) => {
        return cardChecklists.checklistTasks.find((checklistTask) => {
          return checklistTask.businessId === this.cardChecklistTaskId;
        });
      })
    );

    this.subscription = this.cardChecklistTask$.subscribe(
      (cardChecklistTask) => {
        this.cardChecklistTask = cardChecklistTask;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onCardChecklistTaskIsDoneChange(checkboxChange: MatCheckboxChange) {
    this.store.dispatch(
      new UpdateCardChecklistTask({
        cardChecklistTask: {
          businessId: this.cardChecklistTask.businessId,
          isDone: checkboxChange.checked
        }
      })
    );
  }

  onRemoveCardChecklistTask() {
    this.store.dispatch(
      new RemoveCardChecklistTask({
        cardChecklistTask: this.cardChecklistTask,
        cardId: this.cardId
      })
    );
  }
}
