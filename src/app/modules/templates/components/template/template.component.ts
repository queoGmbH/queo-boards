import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';

import { IBoardSummary } from '@boards/core/interfaces';

@Component({
  selector: 'boards-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateComponent implements OnInit {
  @Input()
  template: IBoardSummary;

  @Output()
  templateRemove = new EventEmitter<IBoardSummary>();

  constructor() {}

  ngOnInit() {}

  onTemplateRemove() {
    this.templateRemove.emit(this.template);
  }
}
