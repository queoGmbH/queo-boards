import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

// interfaces
import { ICardComment } from '../interfaces/card-comment.interface';

// services
import { ApiService } from './api.service';

@Injectable()
export class CommentService {
  constructor(private apiService: ApiService) {}

  updateCardComment(comment: ICardComment, action): Observable<ICardComment> {
    return this.apiService.put(
      `/comments/${comment.businessId}/text`,
      {
        value: comment.text
      },
      action
    );
  }

  removeCardComment(comment: ICardComment, action): Observable<ICardComment> {
    return this.apiService.patch(
      `/comments/${comment.businessId}/isDeleted`,
      {
        value: true
      },
      action
    );
  }
}
