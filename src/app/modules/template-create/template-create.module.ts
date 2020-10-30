import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { TemplateCreateComponent } from './containers/template-create/template-create.component';

@NgModule({
  imports: [SharedModule],
  declarations: [TemplateCreateComponent],
  exports: [TemplateCreateComponent]
})
export class TemplateCreateModule {}
