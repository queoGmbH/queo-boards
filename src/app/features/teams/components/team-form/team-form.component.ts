import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { take } from 'rxjs/operators';

import { ITeam } from '@boards/core/interfaces';

import { DialogService } from '@boards/core/services';

@Component({
  selector: 'boards-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamFormComponent implements OnInit {
  teamId: string;

  teamForm: FormGroup;

  updatedTeam: ITeam;

  private _team: ITeam;

  @Input()
  get team() {
    return this._team;
  }
  set team(team: ITeam) {
    this._team = team;
  }

  @Input()
  edit: boolean;

  @Output()
  submitForm = new EventEmitter<ITeam>();
  @Output()
  removeTeam = new EventEmitter<ITeam>();

  constructor(private fb: FormBuilder, private dialogService: DialogService) {}

  ngOnInit() {
    this.initTeamForm();

    if (this.team) {
      this.teamForm.patchValue(this._team);
    }
  }

  get teamFormChanged(): boolean {
    if (this.edit && this.team) {
      return (
        JSON.stringify(this.updatedTeam) !==
        JSON.stringify({
          name: this.team.name,
          description: this.team.description
        })
      );
    }
  }

  initTeamForm() {
    this.teamForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(50)]]
    });

    this.teamForm.valueChanges.subscribe((team: ITeam) => {
      this.updatedTeam = team;
    });
  }

  onSubmit() {
    if (this.teamForm.valid) {
      const { name, description } = this.teamForm.value;
      if (this.edit) {
        this.submitForm.emit({
          businessId: this.team.businessId,
          name,
          description
        });
      } else {
        this.teamForm.reset();
        this.submitForm.emit({
          name,
          description
        });
      }
    }
  }

  onRemoveTeam() {
    const dialogData = {
      title: 'Teams',
      message: `${this.team.name} löschen?`
    };

    this.dialogService
      .confirm(dialogData)
      .pipe(take(1))
      .subscribe((confirm) => {
        if (confirm) {
          this.removeTeam.emit(this.team);
        }
      });
  }
}
