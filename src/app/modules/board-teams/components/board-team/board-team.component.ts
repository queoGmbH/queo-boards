import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { Router } from '@angular/router';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { ITeam, IUser } from '@boards/core/interfaces';
import { BoardRole, UserRole } from '@boards/core/enums';

import { DialogService } from '@boards/core/services';

import { IState } from '@boards/store/state.interface';

@Component({
  selector: 'boards-board-team',
  templateUrl: './board-team.component.html',
  styleUrls: ['./board-team.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardTeamComponent implements OnInit {
  // expose roles to template
  BOARD_OWNER = BoardRole.OWNER;
  BOARD_MEMBER = BoardRole.MEMBER;
  ROLE_ADMIN = UserRole.ADMIN;

  currentUser$: Observable<IUser>;
  currentBoardRoles$: Observable<BoardRole[]>;

  @Input()
  boardTeam: ITeam;

  @Output()
  removeBoardTeam = new EventEmitter<ITeam>();

  constructor(
    private dialogService: DialogService,
    private router: Router,
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

  goToBoardTeam() {
    this.router.navigate([`/teams/${this.boardTeam.businessId}/settings`]);
  }

  onRemoveBoardTeam() {
    const dialogData = {
      title: 'Team',
      message: `Team "${this.boardTeam.name}" von Board entfernen?`
    };

    this.dialogService
      .confirm(dialogData)
      .pipe(take(1))
      .subscribe((confirm) => {
        if (confirm) {
          this.removeBoardTeam.emit(this.boardTeam);
        }
      });
  }
}
