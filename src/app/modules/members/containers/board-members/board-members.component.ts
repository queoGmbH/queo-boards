import { Component, OnDestroy, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { Observable, Subscription } from 'rxjs';

import { IBoard, IUser } from '@boards/core/interfaces';
import { BoardRole, UserRole } from '@boards/core/enums';

import { IState } from '@boards/store/state.interface';

import {
  CreateBoardMember,
  CreateBoardOwner,
  RemoveBoardMember,
  RemoveBoardOwner
} from '@boards/store/board/board.action';

@Component({
  selector: 'boards-board-members',
  templateUrl: './board-members.component.html',
  styleUrls: ['./board-members.component.scss']
})
export class BoardMembersComponent implements OnDestroy, OnInit {
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
      this.members = board.members;
      this.userSubscription = this.users$.subscribe((users) => {
        this.users = users;
      });
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
        new CreateBoardMember({
          boardId: this.board.businessId,
          userId: member.businessId
        })
      );
    }
  }

  handleAddOwner(member: IUser) {
    this.store.dispatch(
      new CreateBoardOwner({
        boardId: this.board.businessId,
        userId: member.businessId
      })
    );
  }

  handleRemoveMember(member: IUser) {
    this.store.dispatch(
      new RemoveBoardMember({
        boardId: this.board.businessId,
        userId: member.businessId
      })
    );
  }

  handleRemoveOwner(member: IUser) {
    this.store.dispatch(
      new RemoveBoardOwner({
        boardId: this.board.businessId,
        userId: member.businessId
      })
    );
  }

  isMember(user: IUser): boolean {
    // TODO: refactor filter + length into .find + undefined
    const found = this.members.filter((member) => {
      return member.businessId === user.businessId;
    });
    return found.length > 0;
  }
}
