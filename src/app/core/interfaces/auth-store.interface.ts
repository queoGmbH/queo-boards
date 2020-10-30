import { IAuthInfo } from './auth-info.interface';
import { IUser } from './user.interface';

export interface IAuthStore {
  currentAuthInfo: IAuthInfo;
  currentUser: IUser;
}
