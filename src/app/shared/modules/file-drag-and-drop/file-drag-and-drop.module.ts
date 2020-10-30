import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxFileDropModule } from 'ngx-file-drop';
import {
  fileDragDropContainers,
  FileDragAndDropComponent
} from '@boards/shared/modules/file-drag-and-drop/containers';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [CommonModule, NgxFileDropModule, MatProgressSpinnerModule],
  declarations: [...fileDragDropContainers],
  exports: [FileDragAndDropComponent, ...fileDragDropContainers]
})
export class FileDragAndDropModule {}
