import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { BoardLabelToggleModule } from '../board-label-toggle/board-label-toggle.module';

import { FilterMemberComponent } from './components/filter-member/filter-member.component';

import { BoardFilterComponent } from './containers/board-filter/board-filter.component';

@NgModule({
  imports: [SharedModule, BoardLabelToggleModule],
  declarations: [BoardFilterComponent, FilterMemberComponent],
  exports: [BoardFilterComponent]
})
export class BoardFilterModule {}
