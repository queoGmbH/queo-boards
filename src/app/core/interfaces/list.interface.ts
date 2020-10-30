import { IBreadcrumbBoard } from './breadcrumb';
import { ICard } from './card.interface';

export interface IList {
  archivedAt?: string | Date;
  board?: IBreadcrumbBoard;
  businessId?: string;
  positionOnBoard?: number;
  title?: string;
  value?: string;
  cards?: ICard[];
}
