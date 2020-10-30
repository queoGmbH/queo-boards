import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {AuthService} from "@boards/core/services";
import {catchError, first, tap} from "rxjs/operators";
import {of} from "rxjs";
import {ShowSnackBar} from "@boards/store/ui";
import {Store} from "@ngrx/store";
import {IState} from "@boards/store/state.interface";

@Component({
  selector: 'boards-password-forgotten',
  templateUrl: './password-forgotten.component.html',
  styleUrls: ['./password-forgotten.component.scss']
})
export class PasswordForgottenComponent implements OnInit {

  showError = false;
  loading = false;

  form = this.fb.group({
    username: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder,
              private router: Router,
              private titleService: Title,
              private authService: AuthService,
              private store: Store<IState>) { }

  ngOnInit() {
    this.titleService.setTitle('Passwort vergessen');
  }

  sendMail() {
    if (this.form.valid) {
      this.loading = true;
      this.authService.requestPasswortResetLink(this.form.get('username').value).pipe(
        first(),
        tap(() => {
          this.store.dispatch(
            new ShowSnackBar({ message: 'Email wurde versendet!' })
          );
          this.form.reset();
          this.showError = false;
          this.loading = false;
        }),
        catchError((error) => {
          this.showError = true;
          this.loading = false;
          return of(error);
        })
      ).subscribe();
    } else {
      this.showError = true;
    }
  }

}
