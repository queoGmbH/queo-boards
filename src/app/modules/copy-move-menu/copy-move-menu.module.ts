import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';

import { FormBoardSelectComponent } from './components/form-board-select/form-board-select.component';
import { FormSelectComponent } from './components/form-select/form-select.component';
import { FormTextareaComponent } from './components/form-textarea/form-textarea.component';

import { CopyCardMenuComponent } from './containers/copy-card-menu/copy-card-menu.component';
import { CopyListMenuComponent } from './containers/copy-list-menu/copy-list-menu.component';
import { MoveCardMenuComponent } from './containers/move-card-menu/move-card-menu.component';
import { MoveListMenuComponent } from './containers/move-list-menu/move-list-menu.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, SharedModule],
  declarations: [
    CopyCardMenuComponent,
    CopyListMenuComponent,
    FormBoardSelectComponent,
    FormSelectComponent,
    FormTextareaComponent,
    MoveCardMenuComponent,
    MoveListMenuComponent
  ],
  exports: [
    CopyCardMenuComponent,
    CopyListMenuComponent,
    MoveCardMenuComponent,
    MoveListMenuComponent
  ]
})
export class CopyMoveMenuModule {}
