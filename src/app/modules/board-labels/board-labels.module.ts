import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';

import { BoardLabelFormComponent } from './components/board-label-form/board-label-form.component';

import { BoardLabelsComponent } from './container/board-labels/board-labels.component';

@NgModule({
  imports: [ReactiveFormsModule, SharedModule],
  declarations: [BoardLabelFormComponent, BoardLabelsComponent],
  exports: [BoardLabelFormComponent, BoardLabelsComponent]
})
export class BoardLabelsModule {}
