import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';

import { ICardAttachment } from '@boards/core/interfaces';

import {
  AttachmentService,
  CardService,
  SignalrService
} from '@boards/core/services';

import { IState } from '../state.interface';

import { GetBoard } from '../board';
import {
  CardAttachmentActionTypes,
  GetCardAttachments,
  GetCardAttachmentsSuccess,
  CreateCardAttachment,
  CreateCardAttachmentSuccess,
  RemoveCardAttachment,
  RemoveCardAttachmentSuccess,
  CreateCardAttachmentFail
} from './card-attachment.action';
import { of } from 'rxjs';
import { ShowSnackBarError } from '@boards/store/ui';

@Injectable()
export class CardAttachmentEffect {
  @Effect()
  getCardAttachments$ = this.actions$.pipe(
    ofType<GetCardAttachments>(CardAttachmentActionTypes.GET_CARD_ATTACHMENTS),
    map((action) => action.payload),
    switchMap(({ cardId }) => {
      return this.cardService.getCardAttachments(cardId);
    }),
    map((cardAttachments: ICardAttachment[]) => {
      return new GetCardAttachmentsSuccess({ cardAttachments });
    })
  );

  @Effect()
  createCardAttachment$ = this.actions$.pipe(
    ofType<CreateCardAttachment>(
      CardAttachmentActionTypes.CREATE_CARD_ATTACHMENT
    ),
    map((action) => action.payload),
    mergeMap(({ card, formData }) => {
      return this.cardService
        .createCardAttachment(card, formData, {
          name: CardAttachmentActionTypes.CREATE_CARD_ATTACHMENT_SUCCESS
        })
        .pipe(
          switchMap((cardAttachment: ICardAttachment) => {
            return [new CreateCardAttachmentSuccess({ cardAttachment })];
          }),
          catchError((error) => {
            if (error.status === 422) {
              return [
                new ShowSnackBarError({
                  message:
                    'Das gewählte Format konnte nicht hochgeladen werden.'
                }),
                new CreateCardAttachmentFail(error)
              ];
            } else {
              return of(
                new ShowSnackBarError({
                  message: 'Es ist ein unerwarteter Fehler aufgetreten.'
                })
              );
            }
          })
        );
    })
  );

  @Effect()
  removeCardAttachment$ = this.actions$.pipe(
    ofType<RemoveCardAttachment>(
      CardAttachmentActionTypes.REMOVE_CARD_ATTACHMENT
    ),
    map((action) => action.payload),
    switchMap(({ attachmentId }) => {
      return this.attachmentService.removeCardAttachment(attachmentId, {
        name: CardAttachmentActionTypes.REMOVE_CARD_ATTACHMENT_SUCCESS,
        boardId: this.signalrService.boardID
      });
    }),
    map((cardAttachment: ICardAttachment) => {
      return new RemoveCardAttachmentSuccess({ cardAttachment });
    })
  );

  @Effect()
  updateCardAttachments$ = this.actions$.pipe(
    ofType(
      CardAttachmentActionTypes.REMOVE_CARD_ATTACHMENT_SUCCESS,
      CardAttachmentActionTypes.CREATE_CARD_ATTACHMENT_SUCCESS
    ),
    switchMap(() => this.store.pipe(select((state) => state.board.businessId))),
    map((boardId: string) => {
      return new GetBoard({ boardId });
    })
  );

  constructor(
    private actions$: Actions,
    private attachmentService: AttachmentService,
    private cardService: CardService,
    private signalrService: SignalrService,
    private store: Store<IState>
  ) {}
}
