import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ICard, ICardComment } from '../../../../core/interfaces';

import { IState } from '@boards/store/state.interface';

@Component({
  selector: 'boards-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  card$: Observable<ICard>;
  cardComments$: Observable<ICardComment[]>;

  @Input()
  boardId: string;
  @Input()
  cardId: string;
  @Input()
  listTitle: string;

  constructor(private store: Store<IState>, private router: Router) {}

  ngOnInit() {
    this.card$ = this.store.pipe(
      select((state) => state.board.cards),
      map((cards: ICard[]) => {
        return cards.find((card) => {
          return card.businessId === this.cardId;
        });
      })
    );

    // use board comments instead of card comments
    this.cardComments$ = this.store.pipe(
      select((state) => state.boardComments),
      map((comments: ICardComment[]) => {
        return comments.filter((comment) => {
          return comment.card.businessId === this.cardId;
        });
      })
    );
  }

  openCardDialog() {
    this.router.navigate([`/board/${this.boardId}/card/${this.cardId}`]);
  }
}
