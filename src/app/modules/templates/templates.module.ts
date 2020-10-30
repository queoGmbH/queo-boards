import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { TemplatesComponent } from './containers/templates/templates.component';
import { TemplateComponent } from './components/template/template.component';

@NgModule({
  imports: [SharedModule],
  declarations: [TemplatesComponent, TemplateComponent],
  exports: [TemplatesComponent]
})
export class TemplatesModule {}
