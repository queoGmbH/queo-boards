import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ICardAttachment } from '../interfaces/attachment.interface';

import { ApiService } from './api.service';

@Injectable()
export class AttachmentService {
  constructor(private apiService: ApiService) {}

  removeCardAttachment(
    attachmentId: string,
    action
  ): Observable<ICardAttachment> {
    return this.apiService.remove(`/attachments/${attachmentId}`, action);
  }
}
