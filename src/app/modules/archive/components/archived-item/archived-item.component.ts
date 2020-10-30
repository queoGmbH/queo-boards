import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';

import { IBoardSummary } from '../../../../core/interfaces/board-summary.interface';
import { ICard } from '../../../../core/interfaces/card.interface';
import { IList } from '../../../../core/interfaces/list.interface';

@Component({
  selector: 'boards-archived-item',
  templateUrl: './archived-item.component.html',
  styleUrls: ['./archived-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArchivedItemComponent implements OnInit {
  @Input()
  item: IBoardSummary | ICard | IList;
  @Input()
  canChange: boolean;

  @Output()
  remove = new EventEmitter<any>();
  @Output()
  restore = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  get showRemove(): boolean {
    // return this.archiveType === 'BOARD';
    return false;
  }

  onRemove() {
    if (this.canChange) {
      this.remove.emit(this.item);
    }
  }

  onRestore() {
    if (this.canChange) {
      this.restore.emit(this.item);
    }
  }
}
