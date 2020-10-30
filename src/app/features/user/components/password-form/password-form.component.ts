import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'boards-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.scss']
})
export class PasswordFormComponent implements OnInit {
  form: FormGroup;

  confirmedPw = true;
  hidePassword1 = true;
  hidePassword2 = true;
  hidePassword3 = true;

  @Output()
  updatePassword = new EventEmitter();

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      newPasswordConfirmation: ['', Validators.required]
    });
  }

  ngOnInit() {}

  onChangePassword() {
    if (
      this.form.value.newPassword === this.form.value.newPasswordConfirmation
    ) {
      this.confirmedPw = true;
      this.updatePassword.emit(this.form.value);
      this.form.reset();
    } else {
      this.confirmedPw = false;
    }
  }
}
