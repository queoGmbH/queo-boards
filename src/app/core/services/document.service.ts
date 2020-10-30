import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ICardAttachment } from '../interfaces';

import { ApiService } from './api.service';

@Injectable()
export class DocumentService {
  constructor(private apiService: ApiService) {}

  getDocumentDownload(attachment: ICardAttachment): Observable<Blob> {
    const params = new HttpParams().append(
      'token',
      attachment.documentDownloadToken
    );
    const options: any = {
      params,
      responseType: 'blob'
    };
    return this.apiService.get(`/documents/download`, options);
  }

  getDocumentThumbnail(attachment: ICardAttachment): Observable<Blob> {
    const { height, documentDownloadToken, width } = attachment;
    const params = new HttpParams()
      .append('height', height.toString())
      .append('token', documentDownloadToken)
      .append('width', width.toString());
    const options: any = {
      params,
      responseType: 'blob'
    };
    return this.apiService.get(`/documents/thumbnail`, options);
  }
}
