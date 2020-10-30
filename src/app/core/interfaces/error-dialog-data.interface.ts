import { IDialogData } from './dialog-data.interface';

export interface IErrorDialogData extends IDialogData {
  errorMessage?: string;
  textReload?: string;
  showError: boolean;
}
