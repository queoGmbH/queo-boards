import { UserRole } from '../enums';

export interface IUser {
  businessId: string;
  firstname: string;
  lastname: string;
  name: string;
  roles: UserRole[];
  isEnabled: boolean;
}
