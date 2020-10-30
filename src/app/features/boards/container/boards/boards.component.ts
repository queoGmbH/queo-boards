import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { IBoardSummary, IUser } from '@boards/core/interfaces';
import { UserRole } from '@boards/core/enums';

import { IState } from '@boards/store/state.interface';

import { CreateBoardDialogComponent } from '../../components/create-board-dialog/create-board-dialog.component';

import { AddBoardSummary } from '@boards/store/board-summary';
import { getBoardSummaries } from '@boards/store';
import { AppStoreService } from '@boards/store/app-store.service';

@Component({
  selector: 'boards-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit {
  ROLE_ADMIN = UserRole.ADMIN;

  currentUser$: Observable<IUser>;

  boardSummaries$ = this.appStoreService.boardSummaries$;
  boardTemplates$ = this.appStoreService.boardTemplates$;

  constructor(
    private appStoreService: AppStoreService,
    private store: Store<IState>,
    private dialog: MatDialog,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Meine Boards');

    this.currentUser$ = this.store.pipe(
      select((state: IState) => state.users.currentUser)
    );
  }

  handleOpenCreateBoardDialog(accessibility: string) {
    const dialogRef = this.dialog.open(CreateBoardDialogComponent, <
      MatDialogConfig
    >{
      width: '600px',
      data: {
        accessibility
      }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        const boardSummary: IBoardSummary = {
          title: result.title,
          colorScheme: result.colorScheme,
          accessibility: result.accessibility
        };

        if (result.template) {
          boardSummary.template = result.template;
        }
        this.store.dispatch(new AddBoardSummary({ boardSummary }));
      }
    });
  }
}
