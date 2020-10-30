import { Injectable } from '@angular/core';

import { Configuration } from './configuration.class';

import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ConfigurationService {
  private static loaded = false;

  private _config: BehaviorSubject<Configuration> = new BehaviorSubject(null);

  get config() {
    return this._config;
  }

  get url() {
    if (this._config) {
      return `${this._config.getValue().webApiBaseUrl}`;
    }
  }

  constructor(private httpClient: HttpClient) {}

  loadConfiguration() {
    return new Promise((resolve) => {
      this.httpClient
        .get<Configuration>(environment.config)
        .pipe(map((response) => response))
        .subscribe((config) => {
          this._config.next(config);
          ConfigurationService.loaded = true;
          resolve();
        });
    });
  }
}

export function loadConfiguration(config: ConfigurationService) {
  return () => config.loadConfiguration();
}
