import { IBoard } from './board.interface';
import { ICard } from './card.interface';

export interface IUIState {
  currentCard: ICard | null;
  currentCardId: string | null;
  copyMove: IBoard | null;
}
