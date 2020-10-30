import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DragulaModule } from 'ng2-dragula';

import { SharedModule } from '../../shared/shared.module';

// modules
import { CardModule } from '../card/card.module';
import { CopyMoveMenuModule } from '../copy-move-menu/copy-move-menu.module';

// container
import { ListComponent } from './container/list/list.component';
import { ListMenuHeaderComponent } from './components/list-menu-header/list-menu-header.component';

@NgModule({
  imports: [
    CommonModule,
    DragulaModule,
    ReactiveFormsModule,
    SharedModule,
    CardModule,
    CopyMoveMenuModule,
    FormsModule
  ],
  declarations: [ListComponent, ListMenuHeaderComponent],
  exports: [ListComponent]
})
export class ListModule {}
