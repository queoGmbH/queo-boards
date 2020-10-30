import { BoardComponent } from './board/board.component';
import { CardDetailComponent } from './card-detail/card-detail.component';
import { CardDetailDialogComponent } from './card-detail-dialog/card-detail-dialog.component';

export const boardContainers: any[] = [
  BoardComponent,
  CardDetailComponent,
  CardDetailDialogComponent
];

export * from './board/board.component';
export * from './card-detail/card-detail.component';
export * from './card-detail-dialog/card-detail-dialog.component';
