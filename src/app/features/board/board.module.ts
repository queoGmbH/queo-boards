import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DragulaModule, DragulaService } from 'ng2-dragula';

import { SharedModule } from '../../shared/shared.module';

import {
  ArchiveModule,
  BoardFilterModule,
  BoardLabelsModule,
  BoardTeamsModule,
  CardDetailAttachmentsModule,
  CardDetailChecklistsModule,
  CardDetailDueDateModule,
  CardLabelsModule,
  CardModule,
  CopyMoveMenuModule,
  ListModule,
  MembersModule,
  TeamSelectModule,
  TemplateCreateModule
} from '@boards/modules';

import { boardComponents } from './components';

import { boardContainers, CardDetailDialogComponent } from './containers';

import { BoardRoutingModule } from './board-routing.module';

@NgModule({
  imports: [
    DragulaModule,
    ReactiveFormsModule,
    SharedModule,
    ArchiveModule,
    BoardFilterModule,
    BoardLabelsModule,
    BoardTeamsModule,
    CardDetailAttachmentsModule,
    CardDetailChecklistsModule,
    CardDetailDueDateModule,
    CardLabelsModule,
    CardModule,
    CopyMoveMenuModule,
    FormsModule,
    ListModule,
    MembersModule,
    TeamSelectModule,
    TemplateCreateModule,
    BoardRoutingModule
  ],
  declarations: [...boardComponents, ...boardContainers],
  providers: [
    DragulaService
  ],
  entryComponents: [CardDetailDialogComponent]
})
export class BoardModule {}
