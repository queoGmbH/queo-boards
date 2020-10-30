import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';

@Component({
  selector: 'boards-card-detail-checklist-progress',
  templateUrl: './card-detail-checklist-progress.component.html',
  styleUrls: ['./card-detail-checklist-progress.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardDetailChecklistProgressComponent implements OnInit {
  @Input()
  tasks: number;
  @Input()
  tasksDone: number;

  constructor() {}

  ngOnInit() {}

  get value() {
    if (this.tasks && this.tasksDone) {
      return Math.floor((this.tasksDone / this.tasks) * 100);
    }
  }

  get color() {
    return this.value !== 100 ? 'accent' : 'primary';
  }
}
