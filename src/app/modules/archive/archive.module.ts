import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { ArchiveBoardComponent } from './containers/archive-board/archive-board.component';
import { ArchiveBoardsComponent } from './containers/archive-boards/archive-boards.component';
import { ArchivedItemComponent } from './components/archived-item/archived-item.component';

@NgModule({
  imports: [SharedModule],
  declarations: [
    ArchivedItemComponent,
    ArchiveBoardsComponent,
    ArchiveBoardComponent
  ],
  exports: [ArchiveBoardComponent, ArchiveBoardsComponent]
})
export class ArchiveModule {}
