import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';

import { FormGroup } from '@angular/forms';

import { IBoardSummary } from '../../../../core/interfaces/board-summary.interface';

import { Accessibility } from '../../../../core/enums/accessibility.enum';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'boards-form-board-select',
  templateUrl: './form-board-select.component.html',
  styleUrls: ['./form-board-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormBoardSelectComponent implements OnInit {
  accessibility = Accessibility;

  @Input()
  controlName: string;
  @Input()
  group: FormGroup;
  @Input()
  items: IBoardSummary[];
  @Input()
  label: string;

  @Output()
  change = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onChange(event: MatSelectChange) {
    this.change.emit(event.value);
  }

  trackById(index, item: IBoardSummary) {
    return item !== null ? item.businessId : null;
  }
}
