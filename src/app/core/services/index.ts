import { ApiService } from './api.service';
import { AttachmentService } from './attachment.service';
import { AuthInfoService } from './auth-info.service';
import { AuthService } from './auth.service';
import { BoardArchiveService } from './board-archive.service';
import { BoardService } from './board.service';
import { BoardTeamService } from './board-team.service';
import { BoardTemplateService } from './board-template.service';
import { CardService } from './card.service';
import { ChecklistService } from './checklist.service';
import { CommentService } from './comment.service';
import { DialogService } from './dialog.service';
import { DocumentService } from './document.service';
import { ErrorHandlingService } from './error-handling.service';
import { HelpService } from './help.service';
import { LabelColorsService } from './label-colors.service';
import { LabelService } from './label.service';
import { ListService } from './list.service';
import { SearchService } from './search.service';
import { SignalrService } from './signalr.service';
import { TaskService } from './task.service';
import { TeamService } from './team.service';
import { ThemeService } from './theme.service';
import { UserService } from './user.service';
import { WindowRefService } from './window-ref.service';
import { SystemConfigurationService } from './system-configuration.service';

export const coreServices: any[] = [
  ApiService,
  AttachmentService,
  AuthInfoService,
  AuthService,
  BoardArchiveService,
  BoardService,
  BoardTeamService,
  BoardTemplateService,
  CardService,
  ChecklistService,
  CommentService,
  DialogService,
  DocumentService,
  ErrorHandlingService,
  HelpService,
  LabelColorsService,
  LabelService,
  ListService,
  SearchService,
  SignalrService,
  SystemConfigurationService,
  TaskService,
  TeamService,
  ThemeService,
  UserService,
  WindowRefService
];

export * from './api.service';
export * from './attachment.service';
export * from './auth-info.service';
export * from './auth.service';
export * from './board-archive.service';
export * from './board-team.service';
export * from './board-template.service';
export * from './board.service';
export * from './card.service';
export * from './checklist.service';
export * from './comment.service';
export * from './dialog.service';
export * from './document.service';
export * from './error-handling.service';
export * from './help.service';
export * from './label-colors.service';
export * from './label.service';
export * from './list.service';
export * from './search.service';
export * from './signalr.service';
export * from './system-configuration.service';
export * from './task.service';
export * from './team.service';
export * from './theme.service';
export * from './user.service';
export * from './window-ref.service';
