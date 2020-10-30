import { IBreadcrumbBoard } from './breadcrumb-board.interface';

export interface IBreadcrumbList {
  businessId: string;
  title: string;

  board: IBreadcrumbBoard;
}
