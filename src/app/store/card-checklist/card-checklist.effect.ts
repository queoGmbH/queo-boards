import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';

import { map, switchMap } from 'rxjs/operators';

import { ICardChecklist, ICardChecklistTask } from '@boards/core/interfaces';

import {
  CardService,
  ChecklistService,
  SignalrService,
  TaskService
} from '@boards/core/services';

import { GetCard } from '../board';
import {
  CardChecklistActionTypes,
  LoadCardChecklists,
  LoadCardChecklistsSuccess,
  CreateCardChecklist,
  CreateCardChecklistSuccess,
  RemoveCardChecklist,
  RemoveCardChecklistSuccess,
  CreateCardChecklistTask,
  CreateCardChecklistTaskSuccess,
  UpdateCardChecklistTask,
  UpdateCardChecklistTaskSuccess,
  RemoveCardChecklistTask,
  RemoveCardChecklistTaskSuccess,
  UpdateCardChecklistTitle,
  UpdateCardChecklistTitleSuccess
} from './card-checklist.action';

@Injectable()
export class CardChecklistEffect {
  @Effect()
  loadCardChecklists$ = this.actions$.pipe(
    ofType<LoadCardChecklists>(CardChecklistActionTypes.LOAD_CARD_CHECKLISTS),
    map((action) => action.payload),
    switchMap(({ cardId }) => {
      return this.cardService.getCardChecklists(cardId);
    }),
    map((cardChecklists: ICardChecklist[]) => {
      return new LoadCardChecklistsSuccess({ cardChecklists });
    })
  );

  @Effect()
  createCardChecklist$ = this.actions$.pipe(
    ofType<CreateCardChecklist>(CardChecklistActionTypes.CREATE_CARD_CHECKLIST),
    map((action) => action.payload),
    switchMap(({ cardChecklist, cardId }) => {
      return this.cardService.createCardChecklist(cardChecklist, cardId, {
        name: CardChecklistActionTypes.CREATE_CARD_CHECKLIST_SUCCESS,
        boardId: this.signalrService.boardID
      });
    }),
    map((inner: ICardChecklist) => {
      return new CreateCardChecklistSuccess({ inner });
    })
  );

  @Effect()
  removeCardChecklist$ = this.actions$.pipe(
    ofType<RemoveCardChecklist>(CardChecklistActionTypes.REMOVE_CARD_CHECKLIST),
    map((action) => action.payload),
    switchMap(({ cardChecklist }) => {
      return this.checklistService.removeCardChecklist(cardChecklist, {
        name: CardChecklistActionTypes.REMOVE_CARD_CHECKLIST_SUCCESS,
        boardId: this.signalrService.boardID
      });
    }),
    map((inner: ICardChecklist) => {
      return new RemoveCardChecklistSuccess({ inner });
    })
  );

  @Effect()
  createCardChecklistTask$ = this.actions$.pipe(
    ofType<CreateCardChecklistTask>(
      CardChecklistActionTypes.CREATE_CARD_CHECKLIST_TASK
    ),
    map((action) => action.payload),
    switchMap(({ cardChecklistId, cardChecklistTask }) => {
      return this.checklistService.createCardChecklistTask(
        cardChecklistId,
        cardChecklistTask,
        {
          name: CardChecklistActionTypes.CREATE_CARD_CHECKLIST_TASK_SUCCESS,
          boardId: this.signalrService.boardID
        }
      );
    }),
    map((inner: ICardChecklistTask) => {
      return new CreateCardChecklistTaskSuccess({ inner });
    })
  );

  @Effect()
  updateCardChecklistTask$ = this.actions$.pipe(
    ofType<UpdateCardChecklistTask>(
      CardChecklistActionTypes.UPDATE_CARD_CHECKLIST_TASK
    ),
    map((action) => action.payload),
    switchMap(({ cardChecklistTask }) => {
      return this.taskService.updateCardChecklistTask(cardChecklistTask, {
        name: CardChecklistActionTypes.UPDATE_CARD_CHECKLIST_TASK_SUCCESS,
        boardId: this.signalrService.boardID
      });
    }),
    map((inner: ICardChecklistTask) => {
      return new UpdateCardChecklistTaskSuccess({ inner });
    })
  );

  @Effect()
  removeChecklistTask$ = this.actions$.pipe(
    ofType<RemoveCardChecklistTask>(
      CardChecklistActionTypes.REMOVE_CARD_CHECKLIST_TASK
    ),
    map((action) => action.payload),
    switchMap(({ cardChecklistTask }) => {
      return this.taskService.deleteCardChecklistTask(cardChecklistTask, {
        name: CardChecklistActionTypes.REMOVE_CARD_CHECKLIST_TASK_SUCCESS,
        boardId: this.signalrService.boardID
      });
    }),
    map((inner: ICardChecklistTask) => {
      return new RemoveCardChecklistTaskSuccess({ inner });
    })
  );

  @Effect()
  updateCardChecklistTitle$ = this.actions$.pipe(
    ofType<UpdateCardChecklistTitle>(
      CardChecklistActionTypes.UPDATE_CARD_CHECKLIST_TITLE
    ),
    map((action) => action.payload),
    switchMap(({ cardChecklistId, cardChecklistTitle }) => {
      return this.checklistService.updateCardChecklistTitle(
        cardChecklistId,
        cardChecklistTitle,
        {
          name: CardChecklistActionTypes.UPDATE_CARD_CHECKLIST_TITLE_SUCCESS,
          boardId: this.signalrService.boardID
        }
      );
    }),
    map((inner: ICardChecklist) => {
      return new UpdateCardChecklistTitleSuccess({ inner });
    })
  );

  @Effect()
  updateCardInfoBang$ = this.actions$.pipe(
    ofType<RemoveCardChecklistSuccess>(
      CardChecklistActionTypes.REMOVE_CARD_CHECKLIST_SUCCESS
    ),
    map((action) => action.payload),
    map(({ inner }) => {
      return new GetCard({ cardId: inner.card.businessId });
    })
  );

  @Effect()
  updateBoardCardInfo$ = this.actions$.pipe(
    ofType<
      | CreateCardChecklistTaskSuccess
      | UpdateCardChecklistTaskSuccess
      | RemoveCardChecklistTaskSuccess
    >(
      CardChecklistActionTypes.CREATE_CARD_CHECKLIST_TASK_SUCCESS,
      CardChecklistActionTypes.UPDATE_CARD_CHECKLIST_TASK_SUCCESS,
      CardChecklistActionTypes.REMOVE_CARD_CHECKLIST_TASK_SUCCESS
    ),
    map((action) => action.payload),
    map(({ inner }) => {
      const {
        card: { businessId: cardId }
      } = inner.checklist;
      return new GetCard({ cardId });
    })
  );

  constructor(
    private actions$: Actions,
    private cardService: CardService,
    private checklistService: ChecklistService,
    private taskService: TaskService,
    private signalrService: SignalrService
  ) {}
}
