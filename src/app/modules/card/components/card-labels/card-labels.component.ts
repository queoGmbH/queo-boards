import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';

import { ILabel } from '../../../../core/interfaces/label.interface';

@Component({
  selector: 'boards-card-labels',
  templateUrl: './card-labels.component.html',
  styleUrls: ['./card-labels.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardLabelsComponent implements OnInit {
  @Input()
  assignedLabels: ILabel[];

  constructor() {}

  ngOnInit() {}

  get showLabels(): boolean {
    return this.assignedLabels.length > 0;
  }
}
