import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DateAdapter, NativeDateAdapter } from '@angular/material/core';

import { Store } from '@ngrx/store';

import * as setHours from 'date-fns/set_hours';
import * as setMinutes from 'date-fns/set_minutes';
import * as format from 'date-fns/format';
import * as isFuture from 'date-fns/is_future';
import * as parse from 'date-fns/parse';

import { ICard } from '@boards/core/interfaces';

import { CreateCardDueDate } from '@boards/store/board';

@Component({
  selector: 'boards-card-detail-due-date',
  templateUrl: './card-detail-due-date.component.html',
  styleUrls: ['./card-detail-due-date.component.scss']
})
export class CardDetailDueDateComponent implements OnInit {
  dueDateForm: FormGroup;

  startDate: Date;

  validTime: boolean;
  validDate: boolean;

  @Input()
  card: ICard;

  @Output()
  toggleForm = new EventEmitter<boolean>();

  @ViewChild('dueDatePicker', {static: false})
  dueDatePicker: any;

  constructor(
    private dateAdapter: DateAdapter<NativeDateAdapter>,
    private fb: FormBuilder,
    private store: Store<any>
  ) {}

  ngOnInit() {
    this.dateAdapter.setLocale('de-DE');
    this.startDate = new Date();

    this.dueDateForm = this.fb.group({
      date: [
        {
          value: null,
          disabled: false
        },
        Validators.required
      ],
      time: ['12:00', Validators.required]
    });

    this.dueDateForm.valueChanges.subscribe((value) => {
      const { date, time } = value;
      this.validTime = /^([0-1]?[0-9]|2[0-3])(:[0-5][0-9])?$/.test(time);
      this.validDate = date instanceof Date;
    });
  }

  get validForm() {
    return this.validDate && this.validTime;
  }

  openDatepicker() {
    this.dueDatePicker.open();
  }

  onDueDateChange(date: Date) {
    this.dueDateForm.setValue({
      date,
      time: format(setHours(date, 12), 'HH:mm')
    });
  }

  saveDueDate() {
    const { date, time } = this.dueDateForm.value;
    const dueDate = this.getNewDate(date, time);
    if (isFuture(parse(dueDate))) {
      this.store.dispatch(
        new CreateCardDueDate({
          dueDate,
          card: this.card
        })
      );
      this.dueDateForm.reset();
      this.toggleForm.emit(false);
    }
  }

  getNewDate(date: Date, time: string): Date {
    let d = date;
    d = setHours(d, parseInt(time.split(':')[0], 10));
    d = setMinutes(d, parseInt(time.split(':')[1], 10));
    return d;
  }

  resetDueDate() {
    this.dueDateForm.reset();
    this.toggleForm.emit(false);
  }
}
