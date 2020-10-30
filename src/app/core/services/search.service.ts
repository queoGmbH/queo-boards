import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { ApiService } from './api.service';

@Injectable()
export class SearchService {
  constructor(private apiService: ApiService) {}

  search(queries: Observable<string>) {
    return queries.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((query: string) => this.searchEntries(query))
    );
  }

  searchEntries(query: string): Observable<any> {
    return this.apiService.get(`/search?q=${encodeURIComponent(query)}`);
  }
}
