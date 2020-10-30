import { BoardEffect } from './board.effect';
import { BoardCardsEffect } from './board-cards.effect';
import { BoardLabelsEffect } from './board-labels.effect';
import { BoardListsEffect } from './board-lists.effect';
import { BoardUsersEffect } from './board-users.effect';

export const boardEffects: any[] = [
  BoardEffect,
  BoardCardsEffect,
  BoardLabelsEffect,
  BoardListsEffect,
  BoardUsersEffect
];

export * from './board.action';

export * from './board.effect';
export * from './board-cards.effect';
export * from './board-labels.effect';
export * from './board-lists.effect';
export * from './board-users.effect';
