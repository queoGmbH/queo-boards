import { IBreadcrumbCard } from './breadcrumb/breadcrumb-card.interface';

export interface ICardAttachment {
  businessId: string;
  documentDownloadToken: string;
  originalFileName: string;

  height?: number;
  url?: any;
  width?: number;

  card: IBreadcrumbCard;
}
