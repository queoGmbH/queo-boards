import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { ITeam } from '@boards/core/interfaces';

import { IState } from '@boards/store/state.interface';

import { CreateBoardTeam } from '@boards/store/board-team';

@Component({
  selector: 'boards-team-select',
  templateUrl: './team-select.component.html',
  styleUrls: ['./team-select.component.scss']
})
export class TeamSelectComponent implements OnInit {
  teamForm: FormGroup;

  boardId: string;
  selectedTeam: ITeam;

  boardTeams$: Observable<ITeam[]>;
  teams$: Observable<ITeam[]>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private store: Store<IState>
  ) {}

  ngOnInit() {
    this.boardId = this.activatedRoute.snapshot.params['boardId'];

    this.boardTeams$ = this.store.pipe(
      select((state: IState) => state.board.teams)
    );
    this.teams$ = this.store.pipe(select((state: IState) => state.teams.all));

    this.teamForm = this.fb.group({
      team: ['']
    });

    this.teamForm.get('team').valueChanges.subscribe((team: ITeam) => {
      this.selectedTeam = team;
    });
  }

  addTeam() {
    if (this.selectedTeam) {
      this.boardTeams$.pipe(take(1)).subscribe((boardTeams: ITeam[]) => {
        const found = boardTeams.find((boardTeam: ITeam) => {
          return boardTeam.businessId === this.selectedTeam.businessId;
        });
        if (!found) {
          this.store.dispatch(
            new CreateBoardTeam({
              boardId: this.boardId,
              teamId: this.selectedTeam.businessId
            })
          );
        }
      });
      this.selectedTeam = undefined;
      this.teamForm.reset();
    }
  }
}
