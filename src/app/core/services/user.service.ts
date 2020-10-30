import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { IUser } from '../interfaces/user.interface';

import { BoardRole } from '../enums/board-role.enum';

import { ApiService } from './api.service';

@Injectable()
export class UserService {
  constructor(private apiService: ApiService) {}

  getCurrentUser(): Observable<IUser> {
    return this.apiService.get(`/user/me`);
  }

  getCurrentUserRoles(): Observable<any> {
    return this.apiService.get(`/user/me/roles`);
  }

  getUsers(): Observable<IUser[]> {
    return this.apiService.getAll(`/user`);
  }

  getBoardRolesByBoardId(boardId: string): Observable<BoardRole[]> {
    return this.apiService.getAll(`/user/me/roles/boards/${boardId}`);
  }
}
