import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { IBoard } from '../interfaces';

import { ApiService } from './api.service';

@Injectable()
export class BoardTeamService {
  private boardUrl = '/boards';

  constructor(private apiService: ApiService) {}

  create(boardId: string, teamId: string, action?: any): Observable<IBoard> {
    return this.apiService.post(
      `${this.boardUrl}/${boardId}/teams`,
      { value: teamId },
      action
    );
  }

  remove(boardId: string, teamId: string, action?: any): Observable<IBoard> {
    return this.apiService.remove(
      `${this.boardUrl}/${boardId}/teams/${teamId}`,
      action
    );
  }
}
