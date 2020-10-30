import { IUser } from './user.interface';
import { BoardRole } from '../enums';

export interface IUserState {
  currentUser: IUser;
  currentBoardRoles: BoardRole[];
  all: IUser[];
}
