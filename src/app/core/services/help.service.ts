import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiService } from './api.service';

@Injectable()
export class HelpService {
  base = '/about';

  constructor(private apiService: ApiService) {}

  getVersion(): Observable<any> {
    return this.apiService.get(`${this.base}/version`);
  }
}
