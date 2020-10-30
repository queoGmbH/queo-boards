import { IBoardSummary } from './board-summary.interface';
import { ICard } from './card.interface';
import { IList } from './list.interface';

export interface IArchive {
  boards?: IBoardSummary[];
  cards?: ICard[];
  lists?: IList[];
}
