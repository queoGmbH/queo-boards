import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { Observable, Subscription } from 'rxjs';

import { IBoard, IUser } from '@boards/core/interfaces';
import { BoardRole, UserRole } from '@boards/core/enums';

import { IState } from '@boards/store/state.interface';

import {
  BoardActionTypes,
  CreateCardMember,
  RemoveCardMember
} from '@boards/store/board';

@Component({
  selector: 'boards-card-members',
  templateUrl: './card-members.component.html',
  styleUrls: ['./card-members.component.scss']
})
export class CardMembersComponent implements OnDestroy, OnInit {
  ROLE_ADMIN = UserRole.ADMIN;
  BOARD_OWNER = BoardRole.OWNER;

  board: IBoard;

  users: IUser[];
  members: IUser[];

  board$: Observable<IBoard>;
  users$: Observable<IUser[]>;
  currentUser$: Observable<IUser>;
  currentBoardRoles$: Observable<BoardRole[]>;

  boardSubscription: Subscription;
  userSubscription: Subscription;

  @Input()
  cardId: string;

  constructor(private store: Store<IState>) {}

  ngOnInit() {
    this.board$ = this.store.pipe(select((state: IState) => state.board));
    this.users$ = this.store.pipe(select((state: IState) => state.users.all));
    this.currentUser$ = this.store.pipe(
      select((state: IState) => state.users.currentUser)
    );
    this.currentBoardRoles$ = this.store.pipe(
      select((state: IState) => state.users.currentBoardRoles)
    );

    this.boardSubscription = this.board$.subscribe((board: IBoard) => {
      this.board = board;
      const card = board.cards.find((boardCard) => {
        return boardCard.businessId === this.cardId;
      });
      if (card !== undefined) {
        this.members = card.assignedUsers;
      }
      this.users = board.boardUsers;
    });
  }

  ngOnDestroy() {
    if (this.boardSubscription) {
      this.boardSubscription.unsubscribe();
    }
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  handleAddMember(member: IUser) {
    if (!this.isMember(member)) {
      this.store.dispatch(
        new CreateCardMember({
          cardId: this.cardId,
          userId: member.businessId
        })
      );
    }
  }

  handleRemoveMember(member: IUser) {
    if (this.isMember(member)) {
      this.store.dispatch(
        new RemoveCardMember({
          cardId: this.cardId,
          userId: member.businessId
        })
      );
    }
  }

  isMember(user: IUser): boolean {
    const found = this.members.find((member) => {
      return member.businessId === user.businessId;
    });
    return !!found;
  }
}
