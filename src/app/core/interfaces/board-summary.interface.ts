import { Accessibility } from '../enums/accessibility.enum';

export interface IBoardSummary {
  accessibility?: Accessibility;
  archivedAt?: string | Date;
  businessId?: string;
  colorScheme?: string;
  createdAt?: string | Date;
  isArchived?: boolean;
  isPrivate?: boolean;
  isTemplate?: boolean;
  template?: boolean;
  title: string;
}
