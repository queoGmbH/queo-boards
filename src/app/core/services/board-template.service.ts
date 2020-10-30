import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { IBoardSummary, IBreadcrumbBoard } from '../interfaces';

import { ApiService } from './api.service';

@Injectable()
export class BoardTemplateService {
  private boardTemplateUrl = '/board-templates';

  constructor(private apiService: ApiService) {}

  getAll(): Observable<IBoardSummary[]> {
    return this.apiService.get(`${this.boardTemplateUrl}`);
  }

  create(template: IBoardSummary, action?: any): Observable<IBoardSummary> {
    return this.apiService.post(
      `${this.boardTemplateUrl}/${template.businessId}`,
      {},
      action
    );
  }

  remove(template: IBoardSummary, action?: any): Observable<IBreadcrumbBoard> {
    return this.apiService.remove(
      `${this.boardTemplateUrl}/${template.businessId}`,
      action
    );
  }
}
