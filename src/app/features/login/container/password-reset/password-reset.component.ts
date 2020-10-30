import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Title} from "@angular/platform-browser";
import {AuthService} from "@boards/core/services";
import {catchError, first, takeUntil, tap} from "rxjs/operators";
import {of, Subject} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {ShowSnackBar} from "@boards/store/ui";
import {Store} from "@ngrx/store";
import {IState} from "@boards/store/state.interface";

@Component({
  selector: 'boards-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit, OnDestroy {

  showError = false;
  loading = false;
  token;

  unsubscribe$ = new Subject();

  form = this.fb.group({
    password: ['', Validators.required],
    password2: ['', Validators.required]
  });

  get passwordsEqual() {
    return this.form.get('password').value === this.form.get('password2').value;
  }

  constructor(private fb: FormBuilder,
              private titleService: Title,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private store: Store<IState>) { }

  ngOnInit() {
    this.titleService.setTitle('Passwort setzen');

    this.route.params.pipe(
      takeUntil(this.unsubscribe$),
      tap(params => {
        this.token = params['resetToken'];
      })
    ).subscribe();
  }

  reset() {
    if (this.form.valid && this.passwordsEqual) {
      this.loading = true;
      this.authService.resetPasswort({
        passwordResetRequestId: this.token,
        newPassword: this.form.get('password').value
      }).pipe(
        first(),
        tap(() => {
          this.router.navigate(['/login']);
          this.store.dispatch(
            new ShowSnackBar({ message: 'Passwort wurde geändert!' })
          );
        }),
        catchError((error) => {
          this.loading = false;
          this.showError = true;
          return of(error);
        })
      ).subscribe();
    } else {
      this.showError = true;
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
