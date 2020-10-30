import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ICardChecklistTask } from '../interfaces/card-checklist-task.interface';

import { ApiService } from './api.service';

@Injectable()
export class TaskService {
  constructor(private apiService: ApiService) {}

  updateCardChecklistTask(
    checklistTask: ICardChecklistTask,
    action
  ): Observable<ICardChecklistTask> {
    return this.apiService.put(
      `/task/${checklistTask.businessId}/isDone`,
      {
        value: checklistTask.isDone
      },
      action
    );
  }

  deleteCardChecklistTask(
    checklistTask: ICardChecklistTask,
    action
  ): Observable<ICardChecklistTask> {
    return this.apiService.remove(`/task/${checklistTask.businessId}`, action);
  }
}
