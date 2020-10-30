import { AccessibilityPipe } from './accessibility.pipe';
import { BorderColorPipe } from './border-color.pipe';
import { CardsByBoardIdPipe } from './cards-by-board-id.pipe';
import { ColorPipe } from './color.pipe';
import { CommentDatePipe } from './comment-date.pipe';
import { CommentsByBoardIdPipe } from './comments-by-board-id.pipe';
import { FormatDatePipe } from './format-date.pipe';
import { HtmlifyPipe } from './htmlify.pipe';
import { KeysPipe } from './keys.pipe';
import { OrderPipe } from './order-by.pipe';
import { ReversePipe } from './reverse.pipe';
import { SafePipe } from './safe.pipe';
import { SortAccessibilityPipe } from './sort-accessibility.pipe';
import { SortDatePipe } from './sort-date.pipe';
import { TranslateAccessibilityPipe } from './translate-accessibility.pipe';
import { UserInitialsPipe } from './user-initials.pipe';
import { UserNamePipe } from './user-name.pipe';

export const sharedPipes: any[] = [
  AccessibilityPipe,
  BorderColorPipe,
  CardsByBoardIdPipe,
  ColorPipe,
  CommentDatePipe,
  CommentsByBoardIdPipe,
  FormatDatePipe,
  HtmlifyPipe,
  KeysPipe,
  OrderPipe,
  ReversePipe,
  SafePipe,
  SortAccessibilityPipe,
  SortDatePipe,
  TranslateAccessibilityPipe,
  UserInitialsPipe,
  UserNamePipe
];

export * from './accessibility.pipe';
export * from './border-color.pipe';
export * from './cards-by-board-id.pipe';
export * from './color.pipe';
export * from './comment-date.pipe';
export * from './comments-by-board-id.pipe';
export * from './format-date.pipe';
export * from './htmlify.pipe';
export * from './keys.pipe';
export * from './order-by.pipe';
export * from './reverse.pipe';
export * from './safe.pipe';
export * from './sort-accessibility.pipe';
export * from './sort-date.pipe';
export * from './translate-accessibility.pipe';
export * from './user-initials.pipe';
export * from './user-name.pipe';
