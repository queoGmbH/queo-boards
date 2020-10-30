import { ICardChecklistState } from '@boards/core/interfaces';

import {
  CardChecklistActionTypes,
  CardChecklistActionsUnion
} from './card-checklist.action';

export const CARD_CHECKLIST_STATE: ICardChecklistState = {
  checklists: [],
  checklistTasks: []
};

export function cardChecklistReducer(
  state: any = CARD_CHECKLIST_STATE,
  action: CardChecklistActionsUnion
): any {
  switch (action.type) {
    case CardChecklistActionTypes.LOAD_CARD_CHECKLISTS_SUCCESS: {
      const { cardChecklists } = action.payload;
      return {
        checklists: [
          ...cardChecklists.map((cardChecklist) => {
            const { card, title, businessId } = cardChecklist;
            return {
              businessId,
              cardBusinessId: card.businessId,
              title
            };
          })
        ],
        checklistTasks: [
          ...cardChecklists
            .filter((cardChecklist) => cardChecklist.tasks.length > 0)
            .map((cardChecklist) => cardChecklist.tasks)
            .reduce((tasks, next) => tasks.concat(next), [])
        ]
      };
    }

    case CardChecklistActionTypes.CREATE_CARD_CHECKLIST_SUCCESS: {
      const cardChecklist = action.payload.inner;
      const { card, title, businessId, tasks } = cardChecklist;
      return {
        checklists: [
          ...state.checklists,
          {
            businessId,
            cardBusinessId: card.businessId,
            title
          }
        ],
        checklistTasks: [...state.checklistTasks, ...tasks]
      };
    }

    case CardChecklistActionTypes.REMOVE_CARD_CHECKLIST_SUCCESS: {
      const cardChecklist = action.payload.inner;
      return {
        ...state,
        checklists: [
          ...state.checklists.filter((checklist) => {
            return checklist.businessId !== cardChecklist.businessId;
          })
        ]
      };
    }

    case CardChecklistActionTypes.UPDATE_CARD_CHECKLIST_TITLE_SUCCESS: {
      const cardChecklist = action.payload.inner;
      return {
        ...state,
        checklists: [
          ...state.checklists.map((checklist) => {
            if (checklist.businessId === cardChecklist.businessId) {
              return cardChecklist;
            }
            return checklist;
          })
        ]
      };
    }

    case CardChecklistActionTypes.CREATE_CARD_CHECKLIST_TASK_SUCCESS: {
      const cardChecklistTask = action.payload.inner;
      return {
        ...state,
        checklistTasks: [...state.checklistTasks, cardChecklistTask]
      };
    }

    case CardChecklistActionTypes.UPDATE_CARD_CHECKLIST_TASK_SUCCESS: {
      const cardChecklistTask = action.payload.inner;
      return {
        ...state,
        checklistTasks: [
          ...state.checklistTasks.map((task) => {
            if (task.businessId === cardChecklistTask.businessId) {
              return cardChecklistTask;
            }
            return task;
          })
        ]
      };
    }

    case CardChecklistActionTypes.REMOVE_CARD_CHECKLIST_TASK_SUCCESS: {
      const cardChecklistTask = action.payload.inner;
      return {
        ...state,
        checklistTasks: [
          ...state.checklistTasks.filter((task) => {
            return task.businessId !== cardChecklistTask.businessId;
          })
        ]
      };
    }

    default: {
      return state;
    }
  }
}
