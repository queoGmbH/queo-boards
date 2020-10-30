import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { TemplateSelectComponent } from './containers/template-select/template-select.component';

@NgModule({
  imports: [SharedModule],
  declarations: [TemplateSelectComponent],
  exports: [TemplateSelectComponent]
})
export class TemplateSelectModule {}
