import { IBreadcrumbChecklist } from './breadcrumb';

export interface ICardChecklistTask {
  businessId?: string;
  isDone?: boolean;
  title?: string;
  // used to create title and update isDone
  value?: string | boolean;

  checklist?: IBreadcrumbChecklist;
}
