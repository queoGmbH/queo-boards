import { IBreadcrumbCard } from './breadcrumb/breadcrumb-card.interface';
import { IUser } from './user.interface';

export interface ICardComment {
  businessId?: string;
  card?: IBreadcrumbCard;
  createdAt?: string | Date;
  createdBy?: IUser;
  isAuthor?: boolean;
  isDeleted?: boolean;
  text?: string;
  value?: string;
}
