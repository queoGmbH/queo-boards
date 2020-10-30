import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';

import { UserManagementRoutingModule } from './user-management-routing.module';

import { userManagementComponents } from './components';
import { userManagementContainers } from './containers';
import { userManagementServices } from './services';

import { FilterUserPipe } from './pipes';
import { FlexLayoutModule } from '@angular/flex-layout';

export const matUserManagementModules = [
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatOptionModule,
  MatPaginatorModule,
  MatSelectModule,
  MatTableModule,
  MatTabsModule,
  MatCheckboxModule,
  MatSnackBarModule,
  MatSortModule,
  MatSlideToggleModule
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    ...matUserManagementModules,
    UserManagementRoutingModule
  ],
  declarations: [
    ...userManagementComponents,
    ...userManagementContainers,
    FilterUserPipe
  ],
  providers: [...userManagementServices]
})
export class UserManagementModule {}
