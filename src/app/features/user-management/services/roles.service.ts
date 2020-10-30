import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiService } from '@boards/core/services';

@Injectable()
export class RolesService {
  constructor(private apiService: ApiService) {}

  getRoles(): Observable<string[]> {
    return this.apiService.get('/roles');
  }
}
