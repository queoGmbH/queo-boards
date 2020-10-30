import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';

// components
import { CardDetailDueDateLabelComponent } from './components/card-detail-due-date-label/card-detail-due-date-label.component';

// containers
import { CardDetailDueDateComponent } from './containers/card-detail-due-date/card-detail-due-date.component';

@NgModule({
  imports: [ReactiveFormsModule, SharedModule],
  declarations: [CardDetailDueDateComponent, CardDetailDueDateLabelComponent],
  exports: [CardDetailDueDateComponent, CardDetailDueDateLabelComponent]
})
export class CardDetailDueDateModule {}
