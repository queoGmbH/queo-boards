import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';

import {
  PageScrollInstance,
  PageScrollOptions,
  PageScrollService
} from 'ngx-page-scroll-core';

import { select, Store } from '@ngrx/store';

import { Observable, Subscription } from 'rxjs';

import { IBoard, ICard } from '@boards/core/interfaces';
import { BoardActions } from '@boards/core/enums';

import { IState } from '@boards/store/state.interface';

import { UpdateCardTitle } from '@boards/store/board';

@Component({
  selector: 'boards-card-detail-dialog',
  templateUrl: './card-detail-dialog.component.html',
  styleUrls: ['./card-detail-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardDetailDialogComponent
  implements AfterViewInit, OnDestroy, OnInit {
  titleForm: FormGroup;

  editDueDate: boolean;

  board$: Observable<IBoard>;
  boardSubscription: Subscription;

  card: ICard;

  action = BoardActions;

  @ViewChild('content', {static: false})
  content: ElementRef;

  @ViewChild(MatMenuTrigger, {static: false})
  copyMenu: MatMenuTrigger;
  @ViewChild(MatMenuTrigger, {static: false})
  moveMenu: MatMenuTrigger;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(DOCUMENT) private document: any,
    private activatedRoute: ActivatedRoute,
    private dialogRef: MatDialogRef<CardDetailDialogComponent>,
    private fb: FormBuilder,
    private pageScrollService: PageScrollService,
    private store: Store<IState>
  ) {}

  ngOnInit() {
    this.board$ = this.store.pipe(select((state) => state.board));

    this.boardSubscription = this.board$.subscribe((board: IBoard) => {
      this.card = board.cards.find((card) => {
        return this.data.cardId === card.businessId;
      });
      if (this.card !== undefined) {
        this.titleForm = this.fb.group({
          title: [
            this.card.title,
            [Validators.required, Validators.maxLength(75)]
          ]
        });
      }
    });

    this.editDueDate = false;
  }

  ngAfterViewInit() {
    if (this.activatedRoute.snapshot.fragment) {
      this.scrollTo(`#id-${this.activatedRoute.snapshot.fragment}`);
    }
  }

  ngOnDestroy() {
    if (this.boardSubscription) {
      this.boardSubscription.unsubscribe();
    }
  }

  get titleChanged(): boolean {
    if (this.card !== undefined) {
      return this.titleForm.value.title !== this.card.title;
    } else {
      return false;
    }
  }

  updateCardTitle() {
    if (this.titleChanged) {
      const { title } = this.titleForm.value;
      this.store.dispatch(
        new UpdateCardTitle({
          title,
          card: this.card
        })
      );
    }
  }

  toggleDueDate(show: boolean) {
    this.editDueDate = show;
  }

  archiveCard(data: ICard) {
    this.dialogRef.close({
      action: BoardActions.ARCHIVE_CARD,
      data
    });
  }

  handleMoveCard(data: any) {
    if (this.moveMenu.menuOpen) {
      this.moveMenu.closeMenu();
    }
  }

  handleCopyCard(data: any) {
    if (this.copyMenu.menuOpen) {
      this.copyMenu.closeMenu();
    }
  }

  scrollTo(id: string) {
    const options: PageScrollOptions = {
      document: this.document,
      scrollTarget: id,
      scrollViews: [this.content.nativeElement],
      duration: 300,
      advancedInlineOffsetCalculation: true
    };

    this.pageScrollService.scroll(options);
  }
}
