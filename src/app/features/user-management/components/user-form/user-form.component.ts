import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';

import { IUser, IUserDetails } from '@boards/core/interfaces';

import { RolesService } from '../../services';

@Component({
  selector: 'boards-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, OnChanges {
  form: FormGroup;
  password_form: FormGroup;
  hidePassword = true;
  hidePassword2 = true;
  hidePassword3 = true;
  hidePassword4 = true;

  isEnabled: boolean;
  confirmedPw = true;
  confirmedPw2 = true;

  resetPassword = false;

  roles$: Observable<string[]>;

  @Input()
  selectedUser: IUserDetails;
  @Input()
  disabled: boolean;

  @Output()
  createUser = new EventEmitter<IUser>();
  @Output()
  updateUser = new EventEmitter<IUser>();
  @Output()
  cancel = new EventEmitter<boolean>();
  @Output()
  updatePassword = new EventEmitter<string>();

  constructor(private fb: FormBuilder, private roleService: RolesService) {
    this.form = fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      mail: ['', Validators.required],
      name: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      isEnabled: [true],
      roles: [[]]
    });

    this.password_form = fb.group({
      password: [''],
      confirmPassword: ['']
    });
  }

  ngOnInit() {
    this.roles$ = this.roleService.getRoles();
  }

  ngOnChanges() {
    if (this.selectedUser) {
      this.form.patchValue(this.selectedUser);
      this.form.controls['password'].disable();
      this.form.controls['confirmPassword'].disable();
      this.resetPassword = false;
    } else {
      this.form.reset();
      this.form.controls['password'].enable();
      this.form.controls['confirmPassword'].enable();
      this.isEnabled = true;
      this.resetPassword = false;
    }
  }

  onUpdatePassword() {
    if (this.password_form.valid) {
      if (
        this.password_form.value.password ===
        this.password_form.value.confirmPassword
      ) {
        this.updatePassword.emit(this.password_form.value.password);
        this.confirmedPw = true;
        this.password_form.reset();
      } else {
        this.confirmedPw2 = false;
      }
    }
  }

  onUpdateUser() {
    if (this.form.valid) {
      delete this.form.value.password;
      delete this.form.value.confirmPassword;
      this.updateUser.emit(this.form.value);
      this.resetPassword = false;
    }
  }

  onCreateUser() {
    if (this.form.valid) {
      if (this.form.value.password === this.form.value.confirmPassword) {
        delete this.form.value.resetPassword;
        delete this.form.value.confirmPassword;
        this.confirmedPw = true;
        this.createUser.emit(this.form.value);
      } else {
        this.confirmedPw = false;
      }
    }
  }

  onCancel() {
    this.form.reset();
    this.password_form.reset();
    this.cancel.emit(true);
  }
}
