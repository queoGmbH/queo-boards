import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import * as compareDesc from 'date-fns/compare_desc';

import { BoardRole, UserRole } from '@boards/core/enums';
import { ICard, IList, IUser } from '@boards/core/interfaces';

import { DialogService } from '@boards/core/services';

import { IState } from '@boards/store/state.interface';

import { RestoreCard, RestoreList } from '@boards/store/archive/archive.action';

@Component({
  selector: 'boards-archive-board',
  templateUrl: './archive-board.component.html',
  styleUrls: ['./archive-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArchiveBoardComponent implements OnInit {
  // roles
  ROLE_ADMIN = UserRole.ADMIN;
  BOARD_MEMBER = BoardRole.MEMBER;
  BOARD_OWNER = BoardRole.OWNER;

  currentUser$: Observable<IUser>;
  currentBoardRoles$: Observable<BoardRole[]>;

  archivedCards$: Observable<ICard[]>;
  archivedLists$: Observable<IList[]>;

  constructor(
    private dialogService: DialogService,
    private store: Store<IState>
  ) {}

  ngOnInit() {
    this.currentUser$ = this.store.pipe(
      select((state: IState) => state.users.currentUser)
    );

    this.currentBoardRoles$ = this.store.pipe(
      select((state: IState) => state.users.currentBoardRoles)
    );

    this.archivedCards$ = this.store.pipe(
      select((state) => {
        return state.archive.cards
          .map((card: ICard) => card)
          .sort((a, b) => compareDesc(a.archivedAt, b.archivedAt));
      })
    );

    this.archivedLists$ = this.store.pipe(
      select((state: IState) => {
        return state.archive.lists
          .map((list: IList) => list)
          .sort((a, b) => compareDesc(a.archivedAt, b.archivedAt));
      })
    );
  }

  handleRestoreCard(card: ICard) {
    const dialogData = {
      title: 'Karte',
      message: `Karte "${card.title}" wiederherstellen?`
    };

    this.dialogService
      .confirm(dialogData)
      .pipe(take(1))
      .subscribe((confirm) => {
        if (confirm) {
          this.store.dispatch(new RestoreCard({ cardId: card.businessId }));
        }
      });
  }

  handleRestoreList(list: IList) {
    const dialogData = {
      title: 'Liste',
      message: `Liste "${list.title}" wiederherstellen?`
    };

    this.dialogService
      .confirm(dialogData)
      .pipe(take(1))
      .subscribe((confirm) => {
        if (confirm) {
          this.store.dispatch(new RestoreList({ listId: list.businessId }));
        }
      });
  }

  trackByBusinessId(index, item: ICard | IList) {
    return item !== null ? item.businessId : null;
  }
}
