import { IBreadcrumbList } from './breadcrumb/breadcrumb-list.interface';
import { ILabel } from './label.interface';

export interface ICard {
  archivedAt: string | Date;
  assignedLabels?: ILabel[];
  assignedUsers?: any[];
  attachmentsCount?: number;
  businessId?: string;
  commentCount?: number;
  createdAt: string | Date;
  description?: string;
  due?: string | Date;
  list?: IBreadcrumbList;
  position?: number;
  tasksDoneCount?: number;
  tasksOverallCount?: number;
  title?: string;
  value?: string | Date;
}
