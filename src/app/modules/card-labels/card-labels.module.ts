import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { BoardLabelsModule } from '../board-labels/board-labels.module';

import { CardLabelsComponent } from './container/card-labels/card-labels.component';
import { BoardLabelSelectComponent } from './components/board-label-select/board-label-select.component';

@NgModule({
  imports: [SharedModule, BoardLabelsModule],
  declarations: [CardLabelsComponent, BoardLabelSelectComponent],
  exports: [CardLabelsComponent]
})
export class CardLabelsModule {}
