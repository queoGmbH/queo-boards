import { Title } from '@angular/platform-browser';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { Subscription } from 'rxjs';

import { AuthService } from '@boards/core/services';

@Component({
  selector: 'boards-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy, OnInit {
  showError = false;

  subscription: Subscription;

  loginForm = new FormGroup({
    login: new FormControl(),
    password: new FormControl()
  });

  constructor(
    private titleService: Title,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Login');
    // whenever we reach login, tear down auth...
    this.authService.removeAuthInfo();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  login() {
    const { login, password } = this.loginForm.value;
    this.subscription = this.authService
      .setupByCreds(login, password)
      .subscribe((loginSucceeded) => {
        if (loginSucceeded) {
          this.showError = false;
          this.router.navigate(['/boards']);
        } else {
          this.showError = true;
        }
      });
  }
}
