import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import * as compareDesc from 'date-fns/compare_desc';

import { IBoardSummary, IUser } from '@boards/core/interfaces';
import { BoardRole, UserRole } from '@boards/core/enums';

import { DialogService } from '@boards/core/services';

import { IState } from '@boards/store/state.interface';

import {
  RemoveArchivedBoard,
  RestoreArchivedBoard
} from '@boards/store/board-archive';
import { AppStoreService } from '@boards/store/app-store.service';

@Component({
  selector: 'boards-archive-boards',
  templateUrl: './archive-boards.component.html',
  styleUrls: ['./archive-boards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArchiveBoardsComponent implements OnInit {
  ROLE_ADMIN = UserRole.ADMIN;
  BOARD_OWNER = BoardRole.OWNER;

  boardArchive$ = this.appStoreService.boardsArchive$.pipe(
    map((boardsArchive) => {
      return boardsArchive
        .map((boardSummary: IBoardSummary) => boardSummary)
        .sort((a, b) => compareDesc(a.archivedAt, b.archivedAt));
    })
  );
  currentBoardRoles$: Observable<BoardRole[]>;
  currentUser$: Observable<IUser>;

  constructor(
    private appStoreService: AppStoreService,
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
  }

  handleRestoreBoard(boardSummary: IBoardSummary) {
    const dialogData = {
      title: 'Board',
      message: `Board "${boardSummary.title}" wiederherstellen?`
    };

    this.dialogService
      .confirm(dialogData)
      .pipe(take(1))
      .subscribe((confirm) => {
        if (confirm) {
          this.store.dispatch(new RestoreArchivedBoard({ boardSummary }));
        }
      });
  }

  handleRemoveBoard(boardSummary: IBoardSummary) {
    const dialogData = {
      title: 'Board',
      message: `Board "${boardSummary.title}" aus Archiv entfernen?`
    };

    this.dialogService
      .confirm(dialogData)
      .pipe(take(1))
      .subscribe((confirm) => {
        if (confirm) {
          this.store.dispatch(new RemoveArchivedBoard({ boardSummary }));
        }
      });
  }

  trackByBusinessId(index, item: IBoardSummary) {
    return item !== null ? item.businessId : null;
  }
}
