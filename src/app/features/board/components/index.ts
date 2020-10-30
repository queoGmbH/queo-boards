import { BoardCommentsComponent } from './board-comments/board-comments.component';
import { CardDetailCommentComponent } from './card-detail-comment/card-detail-comment.component';
import { CardDetailCommentsComponent } from './card-detail-comments/card-detail-comments.component';
import { CardDetailDescriptionComponent } from './card-detail-description/card-detail-description.component';
import { UpdateBoardComponent } from './update-board/update-board.component';

export const boardComponents: any[] = [
  BoardCommentsComponent,
  CardDetailCommentComponent,
  CardDetailCommentsComponent,
  CardDetailDescriptionComponent,
  UpdateBoardComponent
];

export * from './board-comments/board-comments.component';
export * from './card-detail-comment/card-detail-comment.component';
export * from './card-detail-comments/card-detail-comments.component';
export * from './card-detail-description/card-detail-description.component';
export * from './update-board/update-board.component';
