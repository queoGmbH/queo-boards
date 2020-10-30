import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FileDragAndDropModule } from './modules/file-drag-and-drop/file-drag-and-drop.module';
import { MaterialModule } from './modules/material/material.module';

import { sharedComponents } from './components';
import { sharedDirectives } from './directives';
import { sharedPipes } from './pipes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule
  ],
  declarations: [...sharedDirectives, ...sharedComponents, ...sharedPipes],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FileDragAndDropModule,
    MaterialModule,
    ...sharedDirectives,
    ...sharedComponents,
    ...sharedPipes
  ],
  providers: []
})
export class SharedModule {}
