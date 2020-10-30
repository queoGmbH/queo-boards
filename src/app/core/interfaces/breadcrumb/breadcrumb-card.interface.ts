import { IBreadcrumbList } from './breadcrumb-list.interface';

export interface IBreadcrumbCard {
  businessId: string;
  title: string;

  list: IBreadcrumbList;
}
