import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { take } from 'rxjs/operators';

import { ICard, IMove } from '@boards/core/interfaces';
import { BoardActions } from '@boards/core/enums';

import { CardDetailDialogComponent } from '../card-detail-dialog/card-detail-dialog.component';

import {
  MoveCardCurrentSuccess,
  MoveCardSuccess,
  ArchiveCard,
  ArchiveCardSuccess
} from '@boards/store/board';
import {
  ResetCurrentCardId,
  SetCurrentCardId,
  ShowSnackBar
} from '@boards/store/ui';

@Component({
  selector: 'boards-card-detail',
  template: ''
})
export class CardDetailComponent implements OnInit {
  boardId: string;
  cardId: string;

  dialogRef: MatDialogRef<CardDetailDialogComponent>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,
    private store: Store<any>
  ) {
    this.boardId = this.activatedRoute.snapshot.parent.params['boardId'];
    this.cardId = this.activatedRoute.snapshot.params['cardId'];
    this.dialogOpen();
  }

  ngOnInit() {}

  dialogOpen() {
    this.dialogRef = this.dialog.open(CardDetailDialogComponent, <
      MatDialogConfig
    >{
      id: this.cardId,
      width: '650px',
      data: {
        boardId: this.boardId,
        cardId: this.cardId
      }
    });

    this.dialogRef
      .afterOpened()
      .pipe(take(1))
      .subscribe(() => {
        this.store.dispatch(
          new SetCurrentCardId({ currentCardId: this.cardId })
        );
      });

    this.dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((result: any) => {
        this.router.navigate(['/board', this.boardId]).then(() => {
          this.dialogRef = null;
          if (result && result.action) {
            switch (result.action) {
              case BoardActions.MOVE_CARD_OTHER: {
                const move: IMove = result.data;
                const message = `Karte "${move.moved.title}" auf Board "${
                  move.target.summary.title
                }" verschoben.`;
                this.store.dispatch(new ShowSnackBar({ message }));
                return;
              }
              case BoardActions.MOVE_CARD_SIGNAL_R: {
                const inner: IMove = result.data;
                this.store.dispatch(new MoveCardSuccess({ inner }));

                const message = `Karte "${inner.moved.title}" auf Board "${
                  inner.target.summary.title
                }" verschoben.`;
                this.store.dispatch(new ShowSnackBar({ message }));
                return;
              }
              case BoardActions.ARCHIVE_CARD: {
                const card: ICard = result.data;
                this.store.dispatch(
                  new ArchiveCard({
                    cardId: card.businessId,
                    value: true
                  })
                );
                return;
              }
              case BoardActions.ARCHIVE_CARD_SUCCESS: {
                const inner: ICard = result.data;
                this.store.dispatch(new ArchiveCardSuccess({ inner }));

                const message = `Karte "${inner.title}" wurde archiviert.`;
                this.store.dispatch(new ShowSnackBar({ message }));
                return;
              }
            }
          } else {
            // other...
          }

          this.store.dispatch(new ResetCurrentCardId());
        });
      });
  }
}
