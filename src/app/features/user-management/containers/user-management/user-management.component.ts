import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { ISystemConfiguration, IUser } from '@boards/core/interfaces';

import { UserManagementService } from '../../services';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ShowSnackBar } from '@boards/store/ui/ui.action';
import { Store } from '@ngrx/store';
import { IState } from '@boards/store/state.interface';
import { SystemConfigurationService } from '@boards/core/services';

@Component({
  selector: 'boards-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  users$: Observable<IUser[]>;

  systemConfig$: Observable<ISystemConfiguration>;
  numberOfMaxUsers: number;
  selectedUser: IUser = null;
  selectedIndex = 0;

  constructor(
    private userManagementService: UserManagementService,
    private systemConfigService: SystemConfigurationService,
    private store: Store<IState>
  ) {}

  ngOnInit() {
    this.users$ = this.userManagementService.getUsersDetails();
    this.systemConfig$ = this.systemConfigService.getSystemConfiguration();
    this.systemConfig$.subscribe((data) => {
      this.numberOfMaxUsers = data.maxUser;
    });
  }

  handleUserSelect(user: IUser) {
    this.selectedIndex = 1;
    this.selectedUser = user;
  }

  selectedIndexChange(index: number) {
    if (index === 0) {
      this.selectedUser = null;
      this.users$ = this.userManagementService.getUsersDetails();
    }
  }

  handleCreateUser(user: IUser) {
    this.userManagementService.createUser({ user }).subscribe(
      (res) => {},
      (e) => console.log('onError Create: ', e),
      () => {
        this.store.dispatch(
          new ShowSnackBar({ message: 'Nutzer hinzugefügt!' })
        );
        this.selectedIndex = 0;
      }
    );
  }

  handleUpdateUser(user: IUser) {
    this.userManagementService
      .updateUser({ user }, this.selectedUser.businessId)
      .subscribe(
        (res) => {},
        (e) => console.log('onError Update: ', e),
        () => {
          this.store.dispatch(
            new ShowSnackBar({ message: 'Nutzer geändert!' })
          );
          this.selectedIndex = 0;
        }
      );
  }

  handleUpdatePassword(newPassword: string) {
    this.userManagementService
      .updatePassword(newPassword, this.selectedUser.businessId)
      .subscribe(
        (res) => {},
        (error) => console.log('onError Password-Update: ', error),
        () => {
          this.store.dispatch(
            new ShowSnackBar({ message: 'Passwort geändert!' })
          );
        }
      );
  }

  handleCancel() {
    this.selectedIndex = 0;
  }
}
