import { IDialogData } from './dialog-data.interface';

export interface IConfirmDialogData extends IDialogData {
  textOk?: string;
  textCancel?: string;
}
