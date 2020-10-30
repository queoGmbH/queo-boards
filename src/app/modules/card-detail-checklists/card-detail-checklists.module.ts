import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';

// components
import { CardDetailChecklistComponent } from './components/card-detail-checklist/card-detail-checklist.component';
import { CardDetailChecklistProgressComponent } from './components/card-detail-checklist-progress/card-detail-checklist-progress.component';
import { CardDetailChecklistTaskComponent } from './components/card-detail-checklist-task/card-detail-checklist-task.component';
import { CardDetailChecklistTasksComponent } from './components/card-detail-checklist-tasks/card-detail-checklist-tasks.component';

// container
import { CardDetailChecklistsComponent } from './container/card-detail-checklists/card-detail-checklists.component';

@NgModule({
  imports: [ReactiveFormsModule, SharedModule],
  declarations: [
    CardDetailChecklistComponent,
    CardDetailChecklistProgressComponent,
    CardDetailChecklistsComponent,
    CardDetailChecklistTaskComponent,
    CardDetailChecklistTasksComponent
  ],
  exports: [CardDetailChecklistsComponent]
})
export class CardDetailChecklistsModule {}
