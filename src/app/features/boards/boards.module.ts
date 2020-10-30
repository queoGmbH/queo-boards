import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';

import { ArchiveModule } from '@boards/modules/archive/archive.module';
import { BoardLinkModule } from '@boards/modules/board-link/board-link.module';
import { TemplateSelectModule } from '@boards/modules/template-select/template-select.module';
import { TemplatesModule } from '@boards/modules/templates/templates.module';

import { BoardFormComponent } from './components/board-form/board-form.component';
import { CreateBoardDialogComponent } from './components/create-board-dialog/create-board-dialog.component';

import { BoardsComponent } from './container/boards/boards.component';

import { BoardsRoutingModule } from './boards-routing.module';

@NgModule({
  imports: [
    ReactiveFormsModule,
    SharedModule,
    ArchiveModule,
    BoardLinkModule,
    TemplateSelectModule,
    TemplatesModule,
    BoardsRoutingModule
  ],
  declarations: [
    BoardFormComponent,
    BoardsComponent,
    CreateBoardDialogComponent
  ],
  entryComponents: [CreateBoardDialogComponent]
})
export class BoardsModule {}
