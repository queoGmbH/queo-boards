import { IBreadcrumbCard } from './breadcrumb-card.interface';

export interface IBreadcrumbChecklist {
  businessId: string;
  title: string;

  card?: IBreadcrumbCard;
}
