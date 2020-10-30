import { IBoard } from './board.interface';
import { ICard } from './card.interface';
import { ICardComment } from './card-comment.interface';

export interface ISearchResult {
  boards: IBoard[];
  cards: ICard[];
  comments: ICardComment[];
}
