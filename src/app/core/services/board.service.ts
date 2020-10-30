import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import {
  IBoard,
  IBoardSummary,
  ICard,
  ICardComment,
  ILabel,
  IList
} from '../interfaces';

import { ApiService } from './api.service';

@Injectable()
export class BoardService {
  private boardUrl = '/boards';

  constructor(private apiService: ApiService) {}

  getBoards(): Observable<IBoardSummary[]> {
    return this.apiService.getAll(this.boardUrl);
  }

  getCards(boardId: string): Observable<ICard[]> {
    return this.apiService.getAll(`${this.boardUrl}/${boardId}/cards`);
  }

  getBoard(id: string): Observable<IBoard> {
    return this.apiService.getById(this.boardUrl, id);
  }

  getBoardComments(boardId: string): Observable<ICardComment[]> {
    return this.apiService.get(`${this.boardUrl}/${boardId}/comments`);
  }

  getArchivedCards(boardId: string): Observable<ICard[]> {
    return this.apiService.get(`${this.boardUrl}/${boardId}/archived-cards`);
  }

  getArchivedLists(boardId: string): Observable<IList[]> {
    return this.apiService.get(`${this.boardUrl}/${boardId}/archived-lists`);
  }

  createBoard(boardSummary: IBoardSummary): Observable<IBoardSummary> {
    return this.apiService.post(this.boardUrl, boardSummary);
  }

  updateBoard(
    boardSummary: IBoardSummary,
    boardId: string,
    action
  ): Observable<IBoardSummary> {
    return this.apiService.put(
      `${this.boardUrl}/${boardId}`,
      boardSummary,
      action
    );
  }

  getBoardChecklists(boardId: string) {
    return this.apiService.getAll(`${this.boardUrl}/${boardId}/checklists`);
  }

  createBoardLabel(label: ILabel, action): Observable<ILabel> {
    return this.apiService.post(
      `${this.boardUrl}/${label.board.businessId}/labels`,
      label,
      action
    );
  }

  createList(title, boardId, action?: any): Observable<IList> {
    return this.apiService.post(
      `${this.boardUrl}/${boardId}/lists`,
      { value: title },
      action
    );
  }

  createBoardMember({ boardId, userId }, action): Observable<IBoard> {
    return this.apiService.post(
      `${this.boardUrl}/${boardId}/members`,
      { value: userId },
      action
    );
  }

  createBoardOwner({ boardId, userId }, action): Observable<IBoard> {
    return this.apiService.post(
      `${this.boardUrl}/${boardId}/owners`,
      { value: userId },
      action
    );
  }

  removeBoardMember({ boardId, userId }, action): Observable<IBoard> {
    return this.apiService.remove(
      `${this.boardUrl}/${boardId}/members/${userId}`,
      action
    );
  }

  removeBoardOwner({ boardId, userId }, action): Observable<IBoard> {
    return this.apiService.remove(
      `${this.boardUrl}/${boardId}/owners/${userId}`,
      action
    );
  }
}
