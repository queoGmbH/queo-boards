import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import * as compareDesc from 'date-fns/compare_desc';

import { ICard, ICardComment, IUser } from '@boards/core/interfaces';
import { BoardRole, UserRole } from '@boards/core/enums';

import { IState } from '@boards/store/state.interface';

import { DialogService } from '@boards/core/services';

import {
  CreateCardComment,
  RemoveCardComment,
  UpdateCardComment
} from '@boards/store/card-comment';

@Component({
  selector: 'boards-card-detail-comments',
  templateUrl: './card-detail-comments.component.html',
  styleUrls: ['./card-detail-comments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardDetailCommentsComponent implements OnInit {
  ROLE_ADMIN = UserRole.ADMIN;
  BOARD_OWNER = BoardRole.OWNER;

  createCardDetailCommentForm: FormGroup;

  cardComments$: Observable<ICardComment[]>;
  currentUser$: Observable<IUser>;
  currentBoardRoles$: Observable<BoardRole[]>;

  cardDetailEdit: boolean;

  @Input()
  card: ICard;

  constructor(
    private dialogService: DialogService,
    private fb: FormBuilder,
    private store: Store<IState>
  ) {}

  ngOnInit() {
    this.currentUser$ = this.store.pipe(
      select((state: IState) => state.users.currentUser)
    );

    this.currentBoardRoles$ = this.store.pipe(
      select((state: IState) => state.users.currentBoardRoles)
    );

    this.cardComments$ = this.store.pipe(
      select((state) => state.boardComments),
      map((comments: ICardComment[]) => {
        return comments
          .filter((comment) => {
            return comment.card.businessId === this.card.businessId;
          })
          .sort((a, b) => compareDesc(a.createdAt, b.createdAt));
      })
    );

    this.createCardDetailCommentForm = this.fb.group({
      text: ['', Validators.required]
    });

    this.cardDetailEdit = false;
  }

  createCardDetailComment() {
    const cardComment: ICardComment = this.createCardDetailCommentForm.value;
    this.store.dispatch(
      new CreateCardComment({ card: this.card, cardComment })
    );
    this.createCardDetailCommentForm.reset();
  }

  cancelCreateCardDetailComment() {
    this.createCardDetailCommentForm.reset();
  }

  handleUpdateCardDetailComment(cardComment: ICardComment) {
    this.store.dispatch(new UpdateCardComment({ cardComment }));
  }

  handleRemoveCardDetailComment(cardComment: ICardComment) {
    const dialogData = {
      title: 'Kommentar',
      message: 'Möchten Sie Ihren Kommentar löschen?'
    };

    this.dialogService
      .confirm(dialogData)
      .pipe(take(1))
      .subscribe((confirm) => {
        if (confirm) {
          this.store.dispatch(new RemoveCardComment({ cardComment }));
        }
      });
  }
}
