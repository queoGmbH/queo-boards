import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';

import { TeamSelectComponent } from './containers/team-select/team-select.component';

@NgModule({
  imports: [ReactiveFormsModule, SharedModule],
  declarations: [TeamSelectComponent],
  exports: [TeamSelectComponent]
})
export class TeamSelectModule {}
