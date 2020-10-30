import { IBoard } from './board.interface';
import { ICard } from './card.interface';
import { IList } from './list.interface';

export interface IMove {
  moved: ICard | IList;
  source: IBoard;
  target: IBoard;
}
