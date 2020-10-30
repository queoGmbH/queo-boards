import { ICardChecklistTask } from './card-checklist-task.interface';
import { IBreadcrumbCard } from './breadcrumb/breadcrumb-card.interface';

export interface ICardChecklist {
  businessId?: string;
  checklistToCopyBusinessId?: string;
  tasks?: ICardChecklistTask[];
  title?: string;
  value?: string;

  card?: IBreadcrumbCard;
}
