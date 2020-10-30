import { ICardChecklist } from './card-checklist.interface';
import { ICardChecklistTask } from './card-checklist-task.interface';

export interface ICardChecklistState {
  checklists: ICardChecklist[];
  checklistTasks: ICardChecklistTask[];
}
