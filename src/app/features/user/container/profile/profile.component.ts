import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { IUser } from '@boards/core';

import { IState } from '@boards/store/state.interface';
import { ShowSnackBar, ShowSnackBarError } from '@boards/store/ui';

import { PasswordService } from '../../services';

@Component({
  selector: 'boards-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  currentUser$: Observable<IUser>;

  statistics = [
    {
      label: 'Boardsowner',
      value: 3
    },
    {
      label: 'Boardsuser',
      value: 21
    },
    {
      label: 'Placeholder',
      value: 0
    }
  ];

  constructor(
    private titleService: Title,
    private store: Store<IState>,
    private passwordService: PasswordService
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Nutzer - Profil');
    this.currentUser$ = this.store.pipe(
      select((state: IState) => state.users.currentUser)
    );
  }

  handleUpdatePassword(password) {
    this.passwordService.updatePassword(password).subscribe(
      (res) => {
        this.store.dispatch(
          new ShowSnackBar({
            message: 'Das Passwort wurde erfolgreich geändert!'
          })
        );
        // TODO: Felder leeren
      },
      (error) => {
        if (error.status === 400) {
          this.store.dispatch(
            new ShowSnackBarError({
              message:
                'Das alte Passwort ist falsch oder neues Passwort stimmt nicht mit Bestätigung überein.'
            })
          );
        } else {
          this.store.dispatch(
            new ShowSnackBarError({
              message: 'Es ist ein unerwarteter Fehler aufgetreten.'
            })
          );
        }
      }
    );
  }
}
