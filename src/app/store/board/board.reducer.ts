import { Accessibility } from '@boards/core/enums';
import { IBoard } from '@boards/core/interfaces';

import { BoardActionTypes, BoardActionsUnion } from './board.action';

export const INITIAL_BOARD: IBoard = {
  businessId: '',
  summary: {
    accessibility: Accessibility.RESTRICTED,
    colorScheme: '',
    title: ''
  },
  boardUsers: [],
  cards: [],
  owners: [],
  labels: [],
  lists: [],
  members: [],
  teams: []
};

export function boardReducer(
  state: IBoard = INITIAL_BOARD,
  action: BoardActionsUnion
): IBoard {
  switch (action.type) {
    case BoardActionTypes.GET_BOARD_SUCCESS: {
      const board = action.payload.inner;
      return {
        ...board
      };
    }

    case BoardActionTypes.UPDATE_BOARD_SUMMARY_SUCCESS: {
      const boardSummary = action.payload.inner;
      return {
        ...state,
        summary: {
          ...boardSummary
        }
      };
    }

    case BoardActionTypes.CREATE_BOARD_LABEL_SUCCESS: {
      const label = action.payload.inner;
      return {
        ...state,
        labels: [...state.labels, label]
      };
    }

    case BoardActionTypes.COPY_CARD_SUCCESS: {
      const {
        inner: { cards }
      } = action.payload;
      return {
        ...state,
        cards: [...cards]
      };
    }

    case BoardActionTypes.UPDATE_BOARD_LABEL_SUCCESS: {
      const label = action.payload.inner;
      return {
        ...state,
        cards: state.cards.map((card) => {
          return {
            ...card,
            assignedLabels: card.assignedLabels.map((cardLabel) => {
              if (cardLabel.businessId === label.businessId) {
                return label;
              }
              return cardLabel;
            })
          };
        }),
        labels: state.labels.map((boardLabel) => {
          if (boardLabel.businessId === label.businessId) {
            return label;
          }
          return boardLabel;
        })
      };
    }

    case BoardActionTypes.REMOVE_BOARD_LABEL_SUCCESS: {
      const label = action.payload.inner;
      return <IBoard>{
        ...state,
        cards: state.cards.map((card) => {
          return {
            ...card,
            assignedLabels: card.assignedLabels.filter((cardLabel) => {
              return cardLabel.businessId !== label.businessId;
            })
          };
        }),
        labels: state.labels.filter((boardLabel) => {
          return boardLabel.businessId !== label.businessId;
        })
      };
    }

    case BoardActionTypes.UPDATE_CARD_LABEL_SUCCESS:
    case BoardActionTypes.REMOVE_CARD_LABEL_SUCCESS:
    case BoardActionTypes.CREATE_CARD_DUE_DATE_SUCCESS:
    case BoardActionTypes.REMOVE_CARD_DUE_DATE_SUCCESS: {
      const card = action.payload.inner;
      return {
        ...state,
        cards: [
          ...state.cards.map((c) => {
            if (c.businessId === card.businessId) {
              return card;
            }
            return c;
          })
        ]
      };
    }

    case BoardActionTypes.ADD_LIST_SUCCESS: {
      const list = action.payload.inner;
      return <IBoard>{
        ...state,
        lists: [...state.lists, list]
      };
    }

    case BoardActionTypes.MOVE_CARD_CURRENT_SUCCESS: {
      const {
        inner: { source }
      } = action.payload;
      return <IBoard>{
        ...state,
        cards: [...source.cards]
      };
    }

    case BoardActionTypes.MOVE_CARD_DRAG_AND_DROP_SUCCESS: {
      const {
        inner: { source }
      } = action.payload;
      return {
        ...state,
        cards: [...source.cards]
      };
    }

    case BoardActionTypes.MOVE_CARD_SUCCESS: {
      const {
        inner: { target }
      } = action.payload;
      return {
        ...state,
        cards: [...target.cards],
        lists: [...target.lists]
      };
    }

    case BoardActionTypes.MOVE_LIST_CURRENT_SUCCESS:
    case BoardActionTypes.MOVE_LIST_DRAG_AND_DROP_SUCCESS: {
      const {
        inner: { source }
      } = action.payload;
      return {
        ...state,
        lists: [...source.lists]
      };
    }

    case BoardActionTypes.MOVE_LIST_SUCCESS: {
      const {
        inner: { target }
      } = action.payload;
      return {
        ...state,
        cards: [...target.cards],
        lists: [...target.lists]
      };
    }

    case BoardActionTypes.COPY_LIST_SUCCESS: {
      const board = action.payload.inner;
      return {
        ...state,
        cards: [...board.cards],
        lists: [...board.lists]
      };
    }

    case BoardActionTypes.UPDATE_LIST_SUCCESS: {
      const list = action.payload.inner;
      return {
        ...state,
        lists: [
          ...state.lists.map((l) => {
            if (l.businessId === list.businessId) {
              return list;
            }
            return l;
          })
        ]
      };
    }

    case BoardActionTypes.GET_CARD_SUCCESS: {
      const card = action.payload.inner;
      return {
        ...state,
        cards: [
          ...state.cards.map((c) => {
            if (c.businessId === card.businessId) {
              return card;
            }
            return c;
          })
        ]
      };
    }

    case BoardActionTypes.GET_CARDS_SUCCESS: {
      const cards = action.payload.inner;
      return {
        ...state,
        cards: [...cards]
      };
    }

    case BoardActionTypes.ADD_CARD_SUCCESS: {
      const card = action.payload.inner;
      return {
        ...state,
        cards: [...state.cards, card]
      };
    }

    case BoardActionTypes.ADD_CARD_AND_OPEN_SUCCESS: {
      const card = action.payload.inner;
      return {
        ...state,
        cards: [...state.cards, card]
      };
    }

    case BoardActionTypes.ADD_CARDS_FROM_RESTORED_LIST: {
      const cards = action.payload.inner;
      return {
        ...state,
        cards: [...state.cards, ...cards]
      };
    }

    case BoardActionTypes.UPDATE_CARD_TITLE_SUCCESS:
    case BoardActionTypes.UPDATE_CARD_DESCRIPTION_SUCCESS: {
      const card = action.payload.inner;
      return {
        ...state,
        cards: [
          ...state.cards.map((c) => {
            if (c.businessId === card.businessId) {
              return card;
            }
            return c;
          })
        ]
      };
    }

    case BoardActionTypes.ARCHIVE_LIST_SUCCESS: {
      const list = action.payload.inner;
      return {
        ...state,
        lists: [
          ...state.lists.filter((l) => {
            return l.businessId !== list.businessId;
          })
        ]
      };
    }

    case BoardActionTypes.ARCHIVE_CARD_SUCCESS: {
      const card = action.payload.inner;
      return {
        ...state,
        cards: [
          ...state.cards.filter((c) => {
            return c.businessId !== card.businessId;
          })
        ]
      };
    }

    case BoardActionTypes.CREATE_BOARD_MEMBER_SUCCESS: {
      const {
        inner: { boardUsers, members }
      } = action.payload;
      return <IBoard>{
        ...state,
        boardUsers: [...boardUsers],
        members: [...members]
      };
    }

    case BoardActionTypes.REMOVE_BOARD_MEMBER_SUCCESS: {
      const {
        inner: { boardUsers, cards, members }
      } = action.payload;
      return <IBoard>{
        ...state,
        boardUsers: [...boardUsers],
        cards: [...cards],
        members: [...members]
      };
    }

    case BoardActionTypes.CREATE_BOARD_OWNER_SUCCESS: {
      const {
        inner: { boardUsers, owners }
      } = action.payload;
      return {
        ...state,
        boardUsers: [...boardUsers],
        owners: [...owners]
      };
    }

    case BoardActionTypes.REMOVE_BOARD_OWNER_SUCCESS: {
      const {
        inner: { boardUsers, cards, owners }
      } = action.payload;
      return <IBoard>{
        ...state,
        boardUsers: [...boardUsers],
        cards: [...cards],
        owners: [...owners]
      };
    }

    case BoardActionTypes.CREATE_CARD_MEMBER_SUCCESS:
    case BoardActionTypes.REMOVE_CARD_MEMBER_SUCCESS: {
      const card = action.payload.inner;
      return {
        ...state,
        cards: [
          ...state.cards.map((c) => {
            if (c.businessId === card.businessId) {
              return {
                ...card,
                assignedUsers: [...card.assignedUsers]
              };
            }
            return c;
          })
        ]
      };
    }

    case BoardActionTypes.CREATE_BOARD_TEAM_SUCCESS:
    case BoardActionTypes.REMOVE_BOARD_TEAM_SUCCESS: {
      const {
        inner: { boardUsers, cards, teams }
      } = action.payload;
      return {
        ...state,
        boardUsers: [...boardUsers],
        cards: [...cards],
        teams: [...teams]
      };
    }

    default: {
      return state;
    }
  }
}
