import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  NavigationEnd,
  Router
} from '@angular/router';

import { Subject, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { IBoard, ICard, ICardComment, ISearchResult } from '../../interfaces';

import { SearchService } from '../../services';

enum ResultType {
  BOARD = 'board',
  CARD = 'card',
  COMMENT = 'comment'
}

interface ISearchResultItem {
  resultType: ResultType;
  resultModel: IBoard[] | ICard[] | ICardComment[];
}

@Component({
  selector: 'boards-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnDestroy, OnInit {
  results: boolean;
  boardId: string;

  searchForm: FormGroup;

  query$ = new Subject<string>();
  subscription: Subscription;

  searchResult: ISearchResult;

  @ViewChild('globalSearch', {static: false})
  globalSearch: ElementRef;

  get resultTypeBoard(): ResultType {
    return ResultType.BOARD;
  }

  get resultTypeCard(): ResultType {
    return ResultType.CARD;
  }

  get resultTypeComment(): ResultType {
    return ResultType.COMMENT;
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private searchService: SearchService
  ) {}

  ngOnInit() {
    this.results = false;

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute.firstChild.snapshot)
      )
      .subscribe((snapshot: ActivatedRouteSnapshot) => {
        if (snapshot.params['boardId']) {
          this.boardId = snapshot.params['boardId'];
        } else {
          this.boardId = null;
        }
      });

    this.searchForm = this.fb.group({
      search: ['', [Validators.required, Validators.minLength(3)]]
    });

    this.searchForm.valueChanges.subscribe(() => {
      if (this.searchForm.valid) {
        this.query$.next(this.searchForm.value['search']);
      }
    });

    this.subscription = this.searchService
      .search(this.query$)
      .subscribe((result) => {
        this.searchResult = result;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  navigateToBoard(board: IBoard) {
    this.router.navigate(['/board', board.businessId]);
  }

  navigateToCard(card: ICard) {
    const boardId = card.list.board.businessId;
    this.router.navigate([`/board/${boardId}/card/${card.businessId}`]);
  }

  navigateToComment(comment: ICardComment) {
    const boardId = comment.card.list.board.businessId;
    const cardId = comment.card.businessId;
    this.router.navigate([`/board/${boardId}/card/${cardId}`], {
      fragment: comment.businessId
    });
  }

  navigateToResult(event: MatAutocompleteSelectedEvent) {
    // reset search at first (and prevent [object: Object] as search term ;)
    this.resetSearch();

    // get the result itself
    const result: ISearchResultItem = event.option.value;

    // handle the result by its type
    switch (result.resultType) {
      case ResultType.BOARD:
        this.navigateToBoard(result.resultModel as any);
        break;

      case ResultType.CARD:
        this.navigateToCard(result.resultModel as any);
        break;

      case ResultType.COMMENT:
        this.navigateToComment(result.resultModel as any);
        break;
    }
  }

  resetSearch() {
    this.searchForm.reset();
    this.query$.next(null);
  }
}
