import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { IBoardSummary, IBreadcrumbBoard } from '../interfaces';

import { ApiService } from './api.service';

@Injectable()
export class BoardArchiveService {
  private boardArchiveUrl = '/archived-boards';
  private boardUrl = '/boards';

  constructor(private apiService: ApiService) {}

  getAll(): Observable<IBoardSummary[]> {
    return this.apiService.get(`${this.boardArchiveUrl}`);
  }

  create(
    boardSummary: IBoardSummary,
    body?: any,
    action?: any
  ): Observable<IBoardSummary> {
    return this.apiService.post(
      `${this.boardArchiveUrl}/${boardSummary.businessId}`,
      {},
      action
    );
  }

  remove(
    boardSummary: IBoardSummary,
    action?: any
  ): Observable<IBreadcrumbBoard> {
    return this.apiService.remove(
      `${this.boardArchiveUrl}/${boardSummary.businessId}`,
      action
    );
  }

  restore(
    boardSummary: IBoardSummary,
    action?: any
  ): Observable<IBoardSummary> {
    return this.apiService.post(
      `${this.boardUrl}/${boardSummary.businessId}`,
      {},
      action
    );
  }
}
