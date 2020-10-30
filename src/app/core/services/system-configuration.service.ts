import { Observable } from 'rxjs/index';
import { ApiService } from '@boards/core/services/api.service';
import { Injectable } from '@angular/core';
import { ISystemConfiguration } from '@boards/core/interfaces';

@Injectable()
export class SystemConfigurationService {
  constructor(private apiService: ApiService) {}

  getSystemConfiguration(): Observable<ISystemConfiguration> {
    return this.apiService.get(`/systemconfiguration`);
  }
}
