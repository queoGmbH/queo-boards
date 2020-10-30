import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';

import { ITeam, IUser } from '@boards/core';

import { DialogService } from '@boards/core/services';

import { IState } from '@boards/store/state.interface';

import { TeamActions } from '@boards/store/team';

@Component({
  selector: 'boards-team-members',
  templateUrl: './team-members.component.html',
  styleUrls: ['./team-members.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamMembersComponent implements OnInit {
  teamId: string;

  team$: Observable<ITeam>;
  users$: Observable<IUser[]>;

  newMembers: IUser[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private dialogService: DialogService,
    private store: Store<IState>
  ) {}

  ngOnInit() {
    this.teamId = this.activatedRoute.snapshot.parent.params['id'];

    this.team$ = this.store.pipe(
      select((state: IState) => state.teams.currentTeam)
    );
    this.users$ = this.store.pipe(select((state: IState) => state.users.all));

    this.newMembers = [];
  }

  handleAddMember(user: IUser) {
    this.newMembers.push(user);
  }

  handleRemoveNewMember(member: IUser) {
    this.newMembers = this.newMembers.filter((newMember) => {
      return newMember.businessId !== member.businessId;
    });
  }

  addMembers() {
    this.store.dispatch(
      new TeamActions.CreateTeamMembers({
        teamId: this.teamId,
        members: this.newMembers
      })
    );
    this.newMembers = [];
  }

  handleRemoveMember(member: IUser) {
    if (member) {
      const dialogData = {
        title: 'Teams',
        message: `${member.firstname} ${member.lastname} aus Team löschen?`
      };

      this.dialogService
        .confirm(dialogData)
        .pipe(
          tap((confirm) => {
            if (confirm) {
              this.store.dispatch(
                new TeamActions.RemoveTeamMember({
                  teamId: this.teamId,
                  member
                })
              );
            }
          }),
          first()
        )
        .subscribe();
    }
  }
}
