import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { UserRole } from '../../enums';
import { IUser } from '../../interfaces';

import { AuthService } from '../../services';

import { IState } from '@boards/store/state.interface';
import { HelpDialogComponent } from '@boards/core/components/help-dialog/help-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import {ConfigurationService} from "@boards/configuration";

@Component({
  selector: 'boards-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser$: Observable<IUser>;

  ROLE_ADMIN = UserRole.ADMIN;
  BOARDS_ADMIN = UserRole.BOARDS_ADMIN;

  theme = this.configurationService.theme;
  screenType = window.innerWidth < 1024 ? '-mobile' : '';

  constructor(
    private router: Router,
    private store: Store<IState>,
    private authService: AuthService,
    public dialog: MatDialog,
    private configurationService: ConfigurationService
  ) {}

  ngOnInit() {
    this.currentUser$ = this.store.pipe(
      select((state: IState) => state.users.currentUser)
    );
  }

  onResize() {
    this.screenType = window.innerWidth < 1024 ? '-mobile' : '';
  }

  get isAuthAvailable() {
    return this.authService.isAuthInfoAvailable();
  }

  get showTeams() {
    return this.currentUser$.pipe(take(1)).subscribe((user) => {
      return user.roles.some((role) => {
        return role === UserRole.ADMIN;
      });
    });
  }

  openHelpDialog() {
    this.dialog.open(HelpDialogComponent, {
      width: '560px',
      disableClose: true
    });
  }

  logout() {
    // destroy auth stuff
    this.authService.logout();

    // redirect to login
    this.router.navigate(['/login']);
  }
}