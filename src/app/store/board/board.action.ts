import { Action } from '@ngrx/store';

import {
  IBoard,
  IBoardSummary,
  ICard,
  ILabel,
  IList,
  IMove
} from '@boards/core/interfaces';

export enum BoardActionTypes {
  GET_BOARD = '[BOARD] Get Board',
  GET_BOARD_SUCCESS = '[BOARD] Get Board Success',

  UPDATE_BOARD_SUMMARY = '[BOARD] Update Board Summary',
  UPDATE_BOARD_SUMMARY_SUCCESS = '[BOARD] Update Board Summary Success',

  CREATE_BOARD_LABEL = '[BOARD] Add Board Label',
  CREATE_BOARD_LABEL_SUCCESS = '[BOARD] Add Board Label Success',
  UPDATE_BOARD_LABEL = '[BOARD] Update Board Label',
  UPDATE_BOARD_LABEL_SUCCESS = '[BOARD] Update Board Label Success',
  REMOVE_BOARD_LABEL = '[BOARD] Remove Board Label',
  REMOVE_BOARD_LABEL_SUCCESS = '[BOARD] Remove Board Label Success',

  COPY_CARD = '[BOARD] Copy Card',
  COPY_CARD_SUCCESS = '[BOARD] Copy Card Success',

  UPDATE_CARD_LABEL = '[BOARD] Update Card Label',
  UPDATE_CARD_LABEL_SUCCESS = '[BOARD] Update Card Label Success',

  REMOVE_CARD_LABEL = '[BOARD] Remove Card Label',
  REMOVE_CARD_LABEL_SUCCESS = '[BOARD] Remove Card Label Success',

  ADD_LIST = '[BOARD] Add List',
  ADD_LIST_SUCCESS = '[BOARD] Add List Success',

  MOVE_CARD = '[BOARD] Move Card',
  MOVE_CARD_SUCCESS = '[BOARD] Move Card Success',
  MOVE_CARD_DRAG_AND_DROP_SUCCESS = '[BOARD] Move Card Drag And Drop Success',
  MOVE_CARD_CURRENT_SUCCESS = '[BOARD] Move Card Current Success',

  MOVE_LIST = '[BOARD] Move List',
  MOVE_LIST_SUCCESS = '[BOARD] Move List Success',
  MOVE_LIST_DRAG_AND_DROP_SUCCESS = '[BOARD] Move List Drag And Drop Success',
  MOVE_LIST_CURRENT_SUCCESS = '[BOARD] Move List Current Success',

  COPY_LIST = '[BOARD] Copy List',
  COPY_LIST_SUCCESS = '[BOARD] Copy List Success',

  UPDATE_LIST = '[BOARD] Update List',
  UPDATE_LIST_SUCCESS = '[BOARD] Update List Success',

  GET_CARD = '[BOARD] Get Card',
  GET_CARD_SUCCESS = '[BOARD] Get Card Success',
  GET_CARDS = '[BOARD] Get Cards',
  GET_CARDS_SUCCESS = '[BOARD] Get Cards Success',

  ADD_CARD = '[BOARD] Add Card',
  ADD_CARD_SUCCESS = '[BOARD] Add Card Success',

  ADD_CARD_AND_OPEN = '[BOARD] Add Card and Open',
  ADD_CARD_AND_OPEN_SUCCESS = '[BOARD] Add Card and Open Success',

  ADD_CARDS_FROM_RESTORED_LIST = '[BOARD] Add Cards From Restored List',

  UPDATE_CARD_TITLE = '[BOARD] Update Card Title',
  UPDATE_CARD_TITLE_SUCCESS = '[BOARD] Update Card Title Success',
  UPDATE_CARD_DESCRIPTION = '[BOARD] Update Card Description',
  UPDATE_CARD_DESCRIPTION_SUCCESS = '[BOARD] Update Card Description Success',

  CREATE_CARD_DUE_DATE = '[BOARD] Create Card Due Date',
  CREATE_CARD_DUE_DATE_SUCCESS = '[BOARD] Create Card Due Date Success',
  REMOVE_CARD_DUE_DATE = '[BOARD] Remove Card Due Date',
  REMOVE_CARD_DUE_DATE_SUCCESS = '[BOARD] Remove Card Due Date Success',

  CREATE_BOARD_MEMBER = '[BOARD] Create Board Member',
  CREATE_BOARD_MEMBER_SUCCESS = '[BOARD] Create Board Member Success',
  REMOVE_BOARD_MEMBER = '[BOARD] Remove Board Member',
  REMOVE_BOARD_MEMBER_SUCCESS = '[BOARD] Remove Board Member Success',

  CREATE_BOARD_OWNER = '[BOARD] Create Board Owner',
  CREATE_BOARD_OWNER_SUCCESS = '[BOARD] Create Board Owner Success',
  REMOVE_BOARD_OWNER = '[BOARD] Remove Board Owner',
  REMOVE_BOARD_OWNER_SUCCESS = '[BOARD] Remove Board Owner Success',

  CREATE_CARD_MEMBER = '[BOARD] Create Card Member',
  CREATE_CARD_MEMBER_SUCCESS = '[BOARD] Create Card Member Success',
  REMOVE_CARD_MEMBER = '[BOARD] Remove Card Member',
  REMOVE_CARD_MEMBER_SUCCESS = '[BOARD] Remove Card Member Success',

  ARCHIVE_BOARD = '[BOARD] Archive Board',
  // todo: check!
  ARCHIVE_BOARD_SUCCESS = '[BOARD] Archive Board Success',

  ARCHIVE_LIST = '[BOARD] Archive List',
  ARCHIVE_LIST_SUCCESS = '[BOARD] Archive List Success',

  ARCHIVE_CARD = '[BOARD] Archive Card',
  ARCHIVE_CARD_SUCCESS = '[BOARD] Archive Card Success',

  // on success from board-teams...
  CREATE_BOARD_TEAM_SUCCESS = '[BOARD] Create Board Team Success',
  REMOVE_BOARD_TEAM_SUCCESS = '[BOARD_TEAMS] Remove Board Team Success',

  // signalr specific actions
  ARCHIVE_CARD_SUCCESS_SIGNAL_R = '[BOARD] Archive Card Success SignalR',
  ARCHIVE_LIST_SUCCESS_SIGNAL_R = '[BOARD] Archive List Success SignalR',

  COPY_CARD_SUCCESS_SIGNAL_R = '[BOARD] Copy Card Success SignalR',
  COPY_LIST_SUCCESS_SIGNAL_R = '[BOARD] Copy List Success SignalR',

  MOVE_CARD_SUCCESS_SIGNAL_R = '[BOARD] Move Card Success SignalR',
  MOVE_LIST_SUCCESS_SIGNAL_R = '[BOARD] Move List Success SignalR'
}

export class GetBoard implements Action {
  readonly type = BoardActionTypes.GET_BOARD;
  constructor(public payload: { boardId: string }) {}
}

export class GetBoardSuccess implements Action {
  readonly type = BoardActionTypes.GET_BOARD_SUCCESS;
  constructor(public payload: { inner: IBoard }) {}
}

export class UpdateBoardSummary implements Action {
  readonly type = BoardActionTypes.UPDATE_BOARD_SUMMARY;
  constructor(
    public payload: { boardSummary: IBoardSummary; boardId: string }
  ) {}
}

export class UpdateBoardSummarySuccess implements Action {
  readonly type = BoardActionTypes.UPDATE_BOARD_SUMMARY_SUCCESS;
  constructor(public payload: { inner: IBoardSummary }) {}
}

export class CreateBoardLabel implements Action {
  readonly type = BoardActionTypes.CREATE_BOARD_LABEL;
  constructor(public payload: { label: ILabel }) {}
}

export class CreateBoardLabelSuccess implements Action {
  readonly type = BoardActionTypes.CREATE_BOARD_LABEL_SUCCESS;
  constructor(public payload: { inner: ILabel }) {}
}

export class UpdateBoardLabel implements Action {
  readonly type = BoardActionTypes.UPDATE_BOARD_LABEL;
  constructor(public payload: { label: ILabel }) {}
}

export class UpdateBoardLabelSuccess implements Action {
  readonly type = BoardActionTypes.UPDATE_BOARD_LABEL_SUCCESS;
  constructor(public payload: { inner: ILabel }) {}
}

export class RemoveBoardLabel implements Action {
  readonly type = BoardActionTypes.REMOVE_BOARD_LABEL;
  constructor(public payload: { label: ILabel }) {}
}

export class RemoveBoardLabelSuccess implements Action {
  readonly type = BoardActionTypes.REMOVE_BOARD_LABEL_SUCCESS;
  constructor(public payload: { inner: ILabel }) {}
}

export class CopyCard implements Action {
  readonly type = BoardActionTypes.COPY_CARD;
  constructor(public payload: { targetId; body }) {}
}

export class CopyCardSuccess implements Action {
  readonly type = BoardActionTypes.COPY_CARD_SUCCESS;
  constructor(public payload: { inner: IBoard }) {}
}

export class UpdateCardLabel implements Action {
  readonly type = BoardActionTypes.UPDATE_CARD_LABEL;
  constructor(public payload: { label: ILabel; card: ICard }) {}
}

export class UpdateCardLabelSuccess implements Action {
  readonly type = BoardActionTypes.UPDATE_CARD_LABEL_SUCCESS;
  constructor(public payload: { inner: ICard }) {}
}

export class RemoveCardLabel implements Action {
  readonly type = BoardActionTypes.REMOVE_CARD_LABEL;
  constructor(public payload: { label: ILabel; card: ICard }) {}
}

export class RemoveCardLabelSuccess implements Action {
  readonly type = BoardActionTypes.REMOVE_CARD_LABEL_SUCCESS;
  constructor(public payload: { inner: ICard }) {}
}

export class AddList implements Action {
  readonly type = BoardActionTypes.ADD_LIST;
  constructor(public payload: { title: string; boardId: string }) {}
}

export class AddListSuccess implements Action {
  readonly type = BoardActionTypes.ADD_LIST_SUCCESS;
  constructor(public payload: { inner: IList }) {}
}

export class MoveCard implements Action {
  readonly type = BoardActionTypes.MOVE_CARD;
  constructor(public payload: { targetId; body }) {}
}

export class MoveCardSuccess implements Action {
  readonly type = BoardActionTypes.MOVE_CARD_SUCCESS;
  constructor(public payload: { inner: IMove }) {}
}

export class MoveCardDragAndDropSuccess implements Action {
  readonly type = BoardActionTypes.MOVE_CARD_DRAG_AND_DROP_SUCCESS;
  constructor(public payload: { inner: IMove }) {}
}

export class MoveCardCurrentSuccess implements Action {
  readonly type = BoardActionTypes.MOVE_CARD_CURRENT_SUCCESS;
  constructor(public payload: { inner: IMove }) {}
}

export class MoveList implements Action {
  readonly type = BoardActionTypes.MOVE_LIST;
  constructor(public payload: { targetId; body }) {}
}

export class MoveListSuccess implements Action {
  readonly type = BoardActionTypes.MOVE_LIST_SUCCESS;
  constructor(public payload: { inner: IMove }) {}
}

export class MoveListDragAndDropSuccess implements Action {
  readonly type = BoardActionTypes.MOVE_LIST_DRAG_AND_DROP_SUCCESS;
  constructor(public payload: { inner: IMove }) {}
}

export class MoveListCurrentSuccess implements Action {
  readonly type = BoardActionTypes.MOVE_LIST_CURRENT_SUCCESS;
  constructor(public payload: { inner: IMove }) {}
}

export class CopyList implements Action {
  readonly type = BoardActionTypes.COPY_LIST;
  constructor(public payload: { targetId; body }) {}
}

export class CopyListSuccess implements Action {
  readonly type = BoardActionTypes.COPY_LIST_SUCCESS;
  constructor(public payload: { inner: IBoard }) {}
}

export class UpdateList implements Action {
  readonly type = BoardActionTypes.UPDATE_LIST;
  constructor(public payload: { title: string; list: IList }) {}
}

export class UpdateListSuccess implements Action {
  readonly type = BoardActionTypes.UPDATE_LIST_SUCCESS;
  constructor(public payload: { inner: IList }) {}
}

export class GetCard implements Action {
  readonly type = BoardActionTypes.GET_CARD;
  constructor(public payload: { cardId: string }) {}
}

export class GetCardSuccess implements Action {
  readonly type = BoardActionTypes.GET_CARD_SUCCESS;
  constructor(public payload: { inner: ICard }) {}
}

export class GetCards implements Action {
  readonly type = BoardActionTypes.GET_CARDS;
  constructor(public payload: { boardId: string }) {}
}

export class GetCardsSuccess implements Action {
  readonly type = BoardActionTypes.GET_CARDS_SUCCESS;
  constructor(public payload: { inner: ICard[] }) {}
}

export class AddCard implements Action {
  readonly type = BoardActionTypes.ADD_CARD;
  constructor(public payload: { title: string; list: IList }) {}
}

export class AddCardSuccess implements Action {
  readonly type = BoardActionTypes.ADD_CARD_SUCCESS;
  constructor(public payload: { inner: ICard }) {}
}
export class AddCardAndOpen implements Action {
  readonly type = BoardActionTypes.ADD_CARD_AND_OPEN;
  constructor(public payload: { title: string; list: IList }) {}
}

export class AddCardAndOpenSuccess implements Action {
  readonly type = BoardActionTypes.ADD_CARD_AND_OPEN_SUCCESS;
  constructor(public payload: { inner: ICard }) {}
}

export class AddCardsFromRestoredList implements Action {
  readonly type = BoardActionTypes.ADD_CARDS_FROM_RESTORED_LIST;
  constructor(public payload: { inner: ICard[] }) {}
}

export class UpdateCardTitle implements Action {
  readonly type = BoardActionTypes.UPDATE_CARD_TITLE;
  constructor(public payload: { title: string; card: ICard }) {}
}

export class UpdateCardTitleSuccess implements Action {
  readonly type = BoardActionTypes.UPDATE_CARD_TITLE_SUCCESS;
  constructor(public payload: { inner: ICard }) {}
}

export class UpdateCardDescription implements Action {
  readonly type = BoardActionTypes.UPDATE_CARD_DESCRIPTION;
  constructor(public payload: { description: string; cardId: string }) {}
}

export class UpdateCardDescriptionSuccess implements Action {
  readonly type = BoardActionTypes.UPDATE_CARD_DESCRIPTION_SUCCESS;
  constructor(public payload: { inner: ICard }) {}
}

export class CreateCardDueDate implements Action {
  readonly type = BoardActionTypes.CREATE_CARD_DUE_DATE;
  constructor(public payload: { dueDate: Date; card: ICard }) {}
}

export class CreateCardDueDateSuccess implements Action {
  readonly type = BoardActionTypes.CREATE_CARD_DUE_DATE_SUCCESS;
  constructor(public payload: { inner: ICard }) {}
}

export class RemoveCardDueDate implements Action {
  readonly type = BoardActionTypes.REMOVE_CARD_DUE_DATE;
  constructor(public payload: { cardId: string }) {}
}

export class RemoveCardDueDateSuccess implements Action {
  readonly type = BoardActionTypes.REMOVE_CARD_DUE_DATE_SUCCESS;
  constructor(public payload: { inner: ICard }) {}
}

export class ArchiveBoard implements Action {
  readonly type = BoardActionTypes.ARCHIVE_BOARD;
  constructor(public payload: { inner: IBoardSummary }) {}
}

export class ArchiveList implements Action {
  readonly type = BoardActionTypes.ARCHIVE_LIST;
  constructor(public payload: { listId: string; value: boolean }) {}
}

export class ArchiveListSuccess implements Action {
  readonly type = BoardActionTypes.ARCHIVE_LIST_SUCCESS;
  constructor(public payload: { inner: IList }) {}
}

export class ArchiveCard implements Action {
  readonly type = BoardActionTypes.ARCHIVE_CARD;
  constructor(public payload: { cardId: string; value: boolean }) {}
}

export class ArchiveCardSuccess implements Action {
  readonly type = BoardActionTypes.ARCHIVE_CARD_SUCCESS;
  constructor(public payload: { inner: ICard }) {}
}

export class CreateBoardTeamSuccess implements Action {
  readonly type = BoardActionTypes.CREATE_BOARD_TEAM_SUCCESS;
  constructor(public payload: { inner: IBoard }) {}
}

export class RemoveBoardTeamSuccess implements Action {
  readonly type = BoardActionTypes.REMOVE_BOARD_TEAM_SUCCESS;
  constructor(public payload: { inner: IBoard }) {}
}

export class CreateBoardMember implements Action {
  readonly type = BoardActionTypes.CREATE_BOARD_MEMBER;
  constructor(public payload: { boardId: string; userId: string }) {}
}

export class CreateBoardMemberSuccess implements Action {
  readonly type = BoardActionTypes.CREATE_BOARD_MEMBER_SUCCESS;
  constructor(public payload: { inner: IBoard }) {}
}

export class CreateBoardOwner implements Action {
  readonly type = BoardActionTypes.CREATE_BOARD_OWNER;
  constructor(public payload: { boardId: string; userId: string }) {}
}

export class CreateBoardOwnerSuccess implements Action {
  readonly type = BoardActionTypes.CREATE_BOARD_OWNER_SUCCESS;
  constructor(public payload: { inner: IBoard }) {}
}

export class RemoveBoardMember implements Action {
  readonly type = BoardActionTypes.REMOVE_BOARD_MEMBER;
  constructor(public payload: { boardId: string; userId: string }) {}
}

export class RemoveBoardMemberSuccess implements Action {
  readonly type = BoardActionTypes.REMOVE_BOARD_MEMBER_SUCCESS;
  constructor(public payload: { inner: IBoard }) {}
}

export class RemoveBoardOwner implements Action {
  readonly type = BoardActionTypes.REMOVE_BOARD_OWNER;
  constructor(public payload: { boardId: string; userId: string }) {}
}

export class RemoveBoardOwnerSuccess implements Action {
  readonly type = BoardActionTypes.REMOVE_BOARD_OWNER_SUCCESS;
  constructor(public payload: { inner: IBoard }) {}
}

export class CreateCardMember implements Action {
  readonly type = BoardActionTypes.CREATE_CARD_MEMBER;
  constructor(public payload: { cardId: string; userId: string }) {}
}

export class CreateCardMemberSuccess implements Action {
  readonly type = BoardActionTypes.CREATE_CARD_MEMBER_SUCCESS;
  constructor(public payload: { inner: ICard }) {}
}

export class RemoveCardMember implements Action {
  readonly type = BoardActionTypes.REMOVE_CARD_MEMBER;
  constructor(public payload: { cardId: string; userId: string }) {}
}

export class RemoveCardMemberSuccess implements Action {
  readonly type = BoardActionTypes.REMOVE_CARD_MEMBER_SUCCESS;
  constructor(public payload: { inner: ICard }) {}
}

export class ArchiveCardSuccessSignalR implements Action {
  readonly type = BoardActionTypes.ARCHIVE_CARD_SUCCESS_SIGNAL_R;
  constructor(public payload: { inner: ICard }) {}
}

export class ArchiveListSuccessSignalR implements Action {
  readonly type = BoardActionTypes.ARCHIVE_LIST_SUCCESS_SIGNAL_R;
  constructor(public payload: { inner: IList }) {}
}

export class CopyCardSuccessSignalR implements Action {
  readonly type = BoardActionTypes.COPY_CARD_SUCCESS_SIGNAL_R;
  constructor(public payload: { inner: IBoard }) {}
}

export class CopyListSuccessSignalR implements Action {
  readonly type = BoardActionTypes.COPY_LIST_SUCCESS_SIGNAL_R;
  constructor(public payload: { inner: IBoard }) {}
}

export class MoveCardSuccessSignalR implements Action {
  readonly type = BoardActionTypes.MOVE_CARD_SUCCESS_SIGNAL_R;
  constructor(public payload: { inner: IMove }) {}
}

export class MoveListSuccessSignalR implements Action {
  readonly type = BoardActionTypes.MOVE_LIST_SUCCESS_SIGNAL_R;
  constructor(public payload: { inner: IMove }) {}
}

export type BoardActionsUnion =
  | GetBoard
  | GetBoardSuccess
  | UpdateBoardSummary
  | UpdateBoardSummarySuccess
  | CreateBoardLabel
  | CreateBoardLabelSuccess
  | UpdateBoardLabel
  | UpdateBoardLabelSuccess
  | RemoveBoardLabel
  | RemoveBoardLabelSuccess
  | CopyCard
  | CopyCardSuccess
  | UpdateCardLabel
  | UpdateCardLabelSuccess
  | RemoveCardLabel
  | RemoveCardLabelSuccess
  | AddList
  | AddListSuccess
  | MoveCard
  | MoveCardSuccess
  | MoveCardDragAndDropSuccess
  | MoveCardCurrentSuccess
  | MoveList
  | MoveListSuccess
  | MoveListDragAndDropSuccess
  | MoveListCurrentSuccess
  | CopyList
  | CopyListSuccess
  | UpdateList
  | UpdateListSuccess
  | GetCard
  | GetCardSuccess
  | GetCards
  | GetCardsSuccess
  | AddCard
  | AddCardSuccess
  | AddCardAndOpen
  | AddCardAndOpenSuccess
  | AddCardsFromRestoredList
  | UpdateCardTitle
  | UpdateCardTitleSuccess
  | UpdateCardDescription
  | UpdateCardDescriptionSuccess
  | CreateCardDueDate
  | CreateCardDueDateSuccess
  | RemoveCardDueDate
  | RemoveCardDueDateSuccess
  | ArchiveBoard
  | ArchiveList
  | ArchiveListSuccess
  | ArchiveCard
  | ArchiveCardSuccess
  | CreateBoardTeamSuccess
  | RemoveBoardTeamSuccess
  | CreateBoardMember
  | CreateBoardMemberSuccess
  | CreateBoardOwner
  | CreateBoardOwnerSuccess
  | RemoveBoardMember
  | RemoveBoardMemberSuccess
  | RemoveBoardOwner
  | RemoveBoardOwnerSuccess
  | CreateCardMember
  | CreateCardMemberSuccess
  | RemoveCardMember
  | RemoveCardMemberSuccess
  | ArchiveCardSuccessSignalR
  | ArchiveListSuccessSignalR
  | CopyCardSuccessSignalR
  | CopyListSuccessSignalR
  | MoveCardSuccessSignalR
  | MoveListSuccessSignalR;
