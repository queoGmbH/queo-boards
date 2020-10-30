import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { IBoard, ICard, IList, IMove } from '../interfaces';

import { ApiService } from './api.service';

@Injectable()
export class ListService {
  constructor(private apiService: ApiService) {}

  updateList(title, list, action): Observable<IList> {
    return this.apiService.put(
      `/lists/${list.businessId}/title`,
      { value: title },
      action
    );
  }

  copyList(targetId: string, body: any, action): Observable<IBoard> {
    return this.apiService.post(
      `/boards/${targetId}/copiedlists/`,
      body,
      action
    );
  }

  moveList(targetId: string, body: any, action?: any): Observable<IMove> {
    return this.apiService.post(
      `/boards/${targetId}/movedlists/`,
      body,
      action
    );
  }

  createCard(title, list, action?: any): Observable<ICard> {
    return this.apiService.post(
      `/lists/${list.businessId}/cards`,
      { title },
      action
    );
  }

  updateListIsArchived(
    listId: string,
    value: boolean,
    action
  ): Observable<IList> {
    return this.apiService.put(
      `/lists/${listId}/isArchived`,
      { value },
      action
    );
  }
}
