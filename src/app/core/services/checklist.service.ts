import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ICardChecklist, ICardChecklistTask } from '../interfaces';

import { ApiService } from './api.service';

@Injectable()
export class ChecklistService {
  constructor(private apiService: ApiService) {}

  createCardChecklistTask(
    checklistId: string,
    checklistTask: ICardChecklistTask,
    action
  ): Observable<ICardChecklistTask> {
    return this.apiService.post(
      `/checklists/${checklistId}/tasks`,
      {
        value: checklistTask.title
      },
      action
    );
  }

  updateCardChecklistTitle(
    checklistId: string,
    checklistTitle: string,
    action
  ): Observable<ICardChecklist> {
    return this.apiService.put(
      `/checklists/${checklistId}/title`,
      <ICardChecklist>{
        value: checklistTitle
      },
      action
    );
  }

  removeCardChecklist(
    cardChecklist: ICardChecklist,
    action
  ): Observable<ICardChecklist> {
    return this.apiService.remove(
      `/checklists/${cardChecklist.businessId}`,
      action
    );
  }
}
