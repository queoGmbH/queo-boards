import { Pipe, PipeTransform } from '@angular/core';

import { ICardComment } from '@boards/core/interfaces';

@Pipe({
  name: 'commentsByBoardId'
})
export class CommentsByBoardIdPipe implements PipeTransform {
  constructor() {}

  transform(
    comments: ICardComment[],
    boardId?: string,
    include?: boolean
  ): any {
    if (comments) {
      if (boardId) {
        if (include) {
          return comments.filter((comment: ICardComment) => {
            return comment.card.list.board.businessId === boardId;
          });
        }

        if (!include) {
          return comments.filter((comment: ICardComment) => {
            return comment.card.list.board.businessId !== boardId;
          });
        }
      }
    }
    return null;
  }
}
