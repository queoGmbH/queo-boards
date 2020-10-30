import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';

import { BoardLabelToggleComponent } from './container/board-label-toggle/board-label-toggle.component';

@NgModule({
  imports: [ReactiveFormsModule, SharedModule],
  declarations: [BoardLabelToggleComponent],
  exports: [BoardLabelToggleComponent]
})
export class BoardLabelToggleModule {}
