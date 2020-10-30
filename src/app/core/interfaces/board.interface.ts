import { IBoardSummary } from './board-summary.interface';
import { ICard } from './card.interface';
import { ILabel } from './label.interface';
import { IList } from './list.interface';
import { IUser } from './user.interface';
import { ITeam } from './team.interface';

export interface IBoard {
  boardUsers: IUser[];
  businessId: string;
  cards: ICard[];
  labels: ILabel[];
  lists: IList[];
  members: IUser[];
  owners: IUser[];
  summary: IBoardSummary;
  teams: ITeam[];
  // virtual props
  title?: string;
}
