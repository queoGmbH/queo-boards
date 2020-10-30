import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import {
  ICard,
  ICardAttachment,
  ICardChecklist,
  ICardComment,
  ILabel,
  IMove
} from '../interfaces';

import { ApiService } from './api.service';

@Injectable()
export class CardService {
  constructor(private apiService: ApiService) {}

  getCard(cardId: string): Observable<ICard> {
    return this.apiService.get(`/cards/${cardId}`);
  }

  getCardAttachments(cardId: string): Observable<ICardAttachment[]> {
    return this.apiService.getAll(`/cards/${cardId}/attachments`);
  }

  createCardAttachment(
    card: ICard,
    formData: any,
    action
  ): Observable<ICardAttachment> {
    return this.apiService.postFormData(
      `/cards/${card.businessId}/attachments`,
      formData,
      action
    );
  }

  getCardChecklists(cardId: string): Observable<ICardChecklist[]> {
    return this.apiService.getAll(`/cards/${cardId}/checklists`);
  }

  createCardChecklist(
    checklist: ICardChecklist,
    cardId: string,
    action
  ): Observable<ICardChecklist> {
    return this.apiService.post(
      `/cards/${cardId}/checklists`,
      checklist,
      action
    );
  }

  getCardComments(card: ICard): Observable<ICardComment[]> {
    return this.apiService.getAll(`/cards/${card.businessId}/comments`);
  }

  createCardComment(
    card: ICard,
    cardComment: ICardComment,
    action
  ): Observable<ICardComment> {
    return this.apiService.post(
      `/cards/${card.businessId}/comments`,
      { value: cardComment.text },
      action
    );
  }

  copyCard(targetId: string, body: any, action?: any) {
    return this.apiService.post(
      `/lists/${targetId}/copiedcards/`,
      body,
      action
    );
  }

  moveCard(targetId: string, body: any, action?: any): Observable<IMove> {
    return this.apiService.post(`/lists/${targetId}/movedcards/`, body, action);
  }

  updateCardTitle(title, card, action): Observable<ICard> {
    return this.apiService.put(
      `/cards/${card.businessId}/title`,
      { value: title },
      action
    );
  }

  updateCardDescription(
    description,
    cardId: string,
    action
  ): Observable<ICard> {
    return this.apiService.put(
      `/cards/${cardId}/description`,
      { value: description },
      action
    );
  }

  updateCardLabel(label: ILabel, card: ICard, action): Observable<ICard> {
    return this.apiService.put(
      `/cards/${card.businessId}/labels/${label.businessId}/assignment`,
      label,
      action
    );
  }

  removeCardLabel(label: ILabel, card: ICard, action): Observable<ICard> {
    return this.apiService.remove(
      `/cards/${card.businessId}/labels/${label.businessId}/assignment`,
      action
    );
  }

  updateCardIsArchived({ cardId, value }, action): Observable<ICard> {
    return this.apiService.put(
      `/cards/${cardId}/isArchived`,
      { value },
      action
    );
  }

  createCardDueDate(dueDate: Date, card: ICard, action): Observable<ICard> {
    return this.apiService.post(
      `/cards/${card.businessId}/due`,
      { value: dueDate },
      action
    );
  }

  removeCardDueDate(cardId: string, action): Observable<ICard> {
    return this.apiService.remove(`/cards/${cardId}/due`, action);
  }

  createCardMember({ cardId, userId }, action): Observable<ICard> {
    return this.apiService.post(
      `/cards/${cardId}/assignedUsers`,
      { value: userId },
      action
    );
  }

  removeCardMember({ cardId, userId }, action): Observable<ICard> {
    return this.apiService.remove(
      `/cards/${cardId}/assignedUsers/${userId}`,
      action
    );
  }
}
