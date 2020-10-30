import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ApiService } from '@boards/core/services';

import { IUser } from '@boards/core/interfaces';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable()
export class UserManagementService {
  constructor(private apiService: ApiService, private http: HttpClient) {}

  getUsers(): Observable<IUser[]> {
    return this.apiService.get('/user');
  }

  getUsersDetails() {
    return this.apiService.get('/user/with-details');
  }

  createUser({ user }) {
    return this.apiService.post('/user', user);
  }

  updateUser({ user }, userId) {
    return this.apiService.patch(`/user/${userId}`, user).pipe(take(1));
  }

  updatePassword(newPassword, userId) {
    /*let params = new HttpParams();
    params = params.append('newPassword', newPassword);*/
    return this.apiService.put(`/user/${userId}/password`, { newPassword });
    /*return this.http.put(
      `${environment.apiUrl}/api/user/${userId}/password`,
      {},
      { params }
    );*/
  }
}
