import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Observable, Subscription } from 'rxjs';

import { select, Store } from '@ngrx/store';

import { ICard } from '@boards/core/interfaces';
import { IState } from '@boards/store/state.interface';

import { UpdateCardDescription } from '@boards/store/board';

@Component({
  selector: 'boards-card-detail-description',
  templateUrl: './card-detail-description.component.html',
  styleUrls: ['./card-detail-description.component.scss']
})
export class CardDetailDescriptionComponent implements OnDestroy, OnInit {
  descriptionForm: FormGroup;

  card$: Observable<ICard>;
  subscription: Subscription;

  description = '';
  editDescription: boolean;

  @Input()
  cardId: string;

  constructor(private fb: FormBuilder, private store: Store<IState>) {}

  ngOnInit() {
    this.descriptionForm = this.fb.group({
      description: this.description
    });

    this.card$ = this.store.pipe(
      select((state) =>
        state.board.cards.find((card) => card.businessId === this.cardId)
      )
    );

    this.subscription = this.card$.subscribe((card) => {
      if (card !== undefined) {
        this.description = card.description;
        this.descriptionForm.setValue({
          description: this.description
        });
      }
    });

    this.editDescription = false;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  get descriptionChanged(): boolean {
    return this.descriptionForm.value.description !== this.description;
  }

  edit() {
    this.editDescription = true;
  }

  updateCardDescription() {
    this.editDescription = false;
    if (this.descriptionChanged) {
      this.store.dispatch(
        new UpdateCardDescription({
          description: this.descriptionForm.value.description,
          cardId: this.cardId
        })
      );
    }
  }

  cancelUpdateCardDescription() {
    this.editDescription = false;
    this.descriptionForm.setValue({
      description: this.description
    });
  }
}
