import { ILabel } from './label.interface';
import { IUser } from './user.interface';

export interface IBoardFilter {
  labels: ILabel[];
  boardUsers: IUser[];
}
