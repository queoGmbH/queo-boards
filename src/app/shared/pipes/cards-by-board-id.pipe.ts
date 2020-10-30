import { Pipe, PipeTransform } from '@angular/core';

import { ICard } from '@boards/core/interfaces';

@Pipe({
  name: 'cardsByBoardId'
})
export class CardsByBoardIdPipe implements PipeTransform {
  constructor() {}

  transform(cards: ICard[], boardId?: string, include?: boolean): any {
    if (cards) {
      if (boardId) {
        if (include) {
          return cards.filter((card: ICard) => {
            return card.list.board.businessId === boardId;
          });
        }

        if (!include) {
          return cards.filter((card: ICard) => {
            return card.list.board.businessId !== boardId;
          });
        }
      }
    }
    return null;
  }
}
