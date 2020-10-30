import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ILabel } from '../interfaces';

import { ApiService } from './api.service';

@Injectable()
export class LabelService {
  private labelsUrl = '/labels';

  constructor(private apiService: ApiService) {}

  updateBoardLabel(label: ILabel, action): Observable<ILabel> {
    return this.apiService.put(
      `${this.labelsUrl}/${label.businessId}`,
      label,
      action
    );
  }

  removeBoardLabel(label: ILabel, action): Observable<ILabel> {
    return this.apiService.remove(
      `${this.labelsUrl}/${label.businessId}`,
      action
    );
  }
}
