import { ICardChecklist } from './card-checklist.interface';

export interface IBoardChecklist {
  checklists: ICardChecklist[];
  title: string;
}
