import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

import { ICard } from '../../../../core/interfaces/card.interface';
import { IList } from '../../../../core/interfaces/list.interface';

@Component({
  selector: 'boards-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormSelectComponent implements OnInit {
  @Input()
  controlName: string;
  @Input()
  group: FormGroup;

  @Input()
  items: ICard[] | IList;
  @Input()
  label: string;
  @Input()
  hasStart: boolean;

  @Output()
  change = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onChange(event: MatSelectChange) {
    this.change.emit(event.value);
  }

  trackById(index, item: ICard | IList) {
    return item !== null ? item.businessId : null;
  }
}
