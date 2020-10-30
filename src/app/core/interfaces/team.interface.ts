import { IBoard } from './board.interface';
import { IUser } from './user.interface';

export interface ITeam {
  boards?: IBoard[];
  businessId?: string;
  description: string;
  members?: IUser[];
  name: string;
}
