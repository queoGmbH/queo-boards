import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { BoardLinkComponent } from './containers/board-link/board-link.component';

@NgModule({
  imports: [SharedModule],
  declarations: [BoardLinkComponent],
  exports: [BoardLinkComponent]
})
export class BoardLinkModule {}
