import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';

import { ILabel } from '../../../../core/interfaces/label.interface';

@Component({
  selector: 'boards-card-label',
  templateUrl: './card-label.component.html',
  styleUrls: ['./card-label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardLabelComponent implements OnInit {
  @Input()
  cardLabel: ILabel;

  constructor() {}

  ngOnInit() {}
}
