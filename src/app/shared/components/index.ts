import { InputCreateComponent } from './forms/input-create/input-create.component';
import { InputUpdateComponent } from './forms/input-update/input-update.component';
import { ThemeSelectComponent } from './theme-select/theme-select.component';

export const sharedComponents: any[] = [
  InputCreateComponent,
  InputUpdateComponent,
  ThemeSelectComponent
];

export * from './forms/input-create/input-create.component';
export * from './forms/input-update/input-update.component';
export * from './theme-select/theme-select.component';
