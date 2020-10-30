import { Injectable } from '@angular/core';

import { ApiService } from '@boards/core/services';

@Injectable()
export class PasswordService {
  constructor(private apiService: ApiService) {}

  updatePassword(password) {
    return this.apiService.put(`/user/me/password`, password);
  }
}
