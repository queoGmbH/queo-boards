import { IBreadcrumbBoard } from './breadcrumb';

export interface ILabel {
  businessId?: string;
  color: string;
  name: string;

  board?: IBreadcrumbBoard;
}
