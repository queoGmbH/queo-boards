import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';

import { select, Store } from '@ngrx/store';

import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import * as compareDesc from 'date-fns/compare_desc';

import { ICardComment } from '@boards/core/interfaces';

import { IState } from '@boards/store/state.interface';

@Component({
  selector: 'boards-board-comments',
  templateUrl: './board-comments.component.html',
  styleUrls: ['./board-comments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardCommentsComponent implements OnDestroy, OnInit {
  show = 20;
  interval = 20;
  commentCount: number;

  boardComments$: Observable<ICardComment[]>;

  subscription: Subscription;

  constructor(private router: Router, private store: Store<IState>) {}

  ngOnInit() {
    this.boardComments$ = this.store.pipe(
      select((state) => state.boardComments),
      map((comments: ICardComment[]) => {
        return comments
          .filter((comment) => {
            return !comment.isDeleted;
          })
          .sort((a, b) => compareDesc(a.createdAt, b.createdAt));
      })
    );

    this.subscription = this.boardComments$.subscribe((comments) => {
      this.commentCount = comments.length;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openCard(comment: ICardComment) {
    const boardId = comment.card.list.board.businessId;
    const cardId = comment.card.businessId;
    this.router.navigate([`/board/${boardId}/card/${cardId}`], {
      fragment: comment.businessId
    });
  }

  showMore(index: number) {
    if (index + this.interval < this.commentCount) {
      this.show += this.interval;
    } else {
      this.show = this.commentCount;
    }
  }
}
