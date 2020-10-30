import { UserManagementService } from './user-management.service';
import { RolesService } from './roles.service';

export const userManagementServices: any[] = [
  UserManagementService,
  RolesService
];

export * from './user-management.service';
export * from './roles.service';
