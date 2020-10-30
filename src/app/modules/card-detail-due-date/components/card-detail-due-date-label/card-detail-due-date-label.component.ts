import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';

import { Store } from '@ngrx/store';

import * as deLocale from 'date-fns/locale/de/index.js';
import * as differenceInMinutes from 'date-fns/difference_in_minutes';
import * as format from 'date-fns/format';
import * as getDate from 'date-fns/get_date';
import * as getHours from 'date-fns/get_hours';
import * as getMinutes from 'date-fns/get_minutes';
import * as getMonth from 'date-fns/get_month';
import * as getSeconds from 'date-fns/get_seconds';
import * as getYear from 'date-fns/get_year';

import { RemoveCardDueDate } from '@boards/store/board';

@Component({
  selector: 'boards-card-detail-due-date-label',
  templateUrl: './card-detail-due-date-label.component.html',
  styleUrls: ['./card-detail-due-date-label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardDetailDueDateLabelComponent implements OnChanges, OnInit {
  private _dueDate: Date;
  private _realDueDate;

  dueDateWarningInHours = 12;

  displayDate: string;

  @Input()
  set dueDate(date: Date) {
    if (date) {
      this._realDueDate = date;
      this._dueDate = new Date(
        Date.UTC(
          getYear(date),
          getMonth(date),
          getDate(date),
          getHours(date),
          getMinutes(date),
          getSeconds(date)
        )
      );
    }
  }

  get dueDate(): Date {
    return this._dueDate;
  }

  @Input()
  cardId: string;
  @Input()
  details: boolean;
  @Output()
  updateDueDate = new EventEmitter<boolean>();

  constructor(private store: Store<any>) {}

  get labelClass() {
    return !this.details ? 'due-date-label--card' : '';
  }

  get dueDateBackGroundColor(): string {
    const dueDateDifferenceToNow = differenceInMinutes(
      this._realDueDate,
      Date.now()
    );

    if (
      dueDateDifferenceToNow > 0 &&
      dueDateDifferenceToNow <= this.dueDateWarningInHours * 60
    ) {
      return 'warning';
    }

    if (dueDateDifferenceToNow <= 0) {
      return 'critical';
    }
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.dueDate) {
      this.displayDate = this.formatDate(changes.dueDate.currentValue);
    }
  }

  formatDate(date: Date) {
    const formatString = this.details
      ? 'D. MMM. YY [um] HH:mm [Uhr]'
      : 'D. MMM. YY';
    return format(new Date(date), formatString, { locale: deLocale });
  }

  editDueDate() {
    this.updateDueDate.emit(true);
  }

  removeDueDate(event) {
    event.stopPropagation();
    this.store.dispatch(new RemoveCardDueDate({ cardId: this.cardId }));
  }
}
