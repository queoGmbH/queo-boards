import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';

import { CardDetailAttachmentsComponent } from './container/card-detail-attachments/card-detail-attachments.component';
import { CardDetailThumbnailComponent } from './components/card-detail-thumbnail/card-detail-thumbnail.component';
import { CardDetailUploadComponent } from './components/card-detail-upload/card-detail-upload.component';

@NgModule({
  imports: [FormsModule, ReactiveFormsModule, SharedModule],
  declarations: [
    CardDetailAttachmentsComponent,
    CardDetailThumbnailComponent,
    CardDetailUploadComponent
  ],
  exports: [CardDetailAttachmentsComponent]
})
export class CardDetailAttachmentsModule {}
