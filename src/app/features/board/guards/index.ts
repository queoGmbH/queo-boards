import { BoardsGuard } from './boards.guard';
import { CardAttachmentsGuard } from './card-attachments.guard';
import { RedirectForArchivedBoardGuard } from './redirect-for-archived-board.guard';
import { RedirectForArchivedCardGuard } from './redirect-for-archived-card.guard';

export const boardGuards: any[] = [
  BoardsGuard,
  CardAttachmentsGuard,
  RedirectForArchivedCardGuard,
  RedirectForArchivedBoardGuard
];

export {
  BoardsGuard,
  CardAttachmentsGuard,
  RedirectForArchivedBoardGuard,
  RedirectForArchivedCardGuard
};
