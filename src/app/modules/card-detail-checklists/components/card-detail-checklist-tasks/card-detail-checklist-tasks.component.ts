import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';

import { select, Store } from '@ngrx/store';

import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  ICardChecklistTask,
  ICardChecklistState
} from '@boards/core/interfaces';

import { IState } from '@boards/store/state.interface';

import { CreateCardChecklistTask } from '@boards/store/card-checklist';

@Component({
  selector: 'boards-card-detail-checklist-tasks',
  templateUrl: './card-detail-checklist-tasks.component.html',
  styleUrls: ['./card-detail-checklist-tasks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardDetailChecklistTasksComponent implements OnDestroy, OnInit {
  cardChecklistTasks$: any;

  tasksDone: number;

  subscription: Subscription;

  @Input()
  cardId: string;
  @Input()
  cardChecklistId: string;

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.cardChecklistTasks$ = this.store.pipe(
      select((state: IState) => state.cardChecklists),
      map((cardChecklists: ICardChecklistState) => {
        return cardChecklists.checklistTasks.filter((cardChecklistTask) => {
          return (
            cardChecklistTask.checklist.businessId === this.cardChecklistId
          );
        });
      })
    );

    this.subscription = this.cardChecklistTasks$.subscribe((tasks) => {
      this.tasksDone = 0;
      tasks.forEach((task) => {
        if (task.isDone) {
          this.tasksDone += 1;
        }
      });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onCreateCardChecklistTask(cardChecklistTaskTitle: string) {
    this.store.dispatch(
      new CreateCardChecklistTask({
        cardChecklistId: this.cardChecklistId,
        cardChecklistTask: {
          title: cardChecklistTaskTitle
        }
      })
    );
  }

  trackByCardChecklistTask(index, item: ICardChecklistTask) {
    return item !== null ? item.businessId : null;
  }
}
