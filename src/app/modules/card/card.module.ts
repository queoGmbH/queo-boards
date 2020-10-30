import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';

// modules
import { CardDetailDueDateModule } from '../card-detail-due-date/card-detail-due-date.module';

// components
import { CardAttachmentCountComponent } from './components/card-attachment-count/card-attachment-count.component';
import { CardCommentCountComponent } from './components/card-comment-count/card-comment-count.component';
import { CardLabelComponent } from './components/card-label/card-label.component';
import { CardLabelsComponent } from './components/card-labels/card-labels.component';
import { CardUserComponent } from './components/card-user/card-user.component';
import { CardUsersComponent } from './components/card-users/card-users.component';

// container
import { CardComponent } from './container/card/card.component';
import { CardTasksComponent } from './components/card-tasks/card-tasks.component';

@NgModule({
  imports: [ReactiveFormsModule, SharedModule, CardDetailDueDateModule],
  declarations: [
    CardAttachmentCountComponent,
    CardCommentCountComponent,
    CardComponent,
    CardLabelComponent,
    CardLabelsComponent,
    CardUserComponent,
    CardUsersComponent,
    CardTasksComponent
  ],
  exports: [CardComponent],
  entryComponents: []
})
export class CardModule {}
