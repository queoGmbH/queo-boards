import { UserCategory } from '../enums/user-category.enum';

export interface IUserDetails {
  userCategory: UserCategory;
  canWrite: boolean;
  company: string;
  department: string;
  isEnabled: boolean;
  mail: string;
  phone: string;
  businessId: string;
  firstname: string;
  lastname: string;
  name: string;
  roles: string[];
}
