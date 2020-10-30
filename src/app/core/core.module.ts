import { APP_INITIALIZER, NgModule } from '@angular/core';
// todo: remove and refactor to HttpClientModule
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// third-party modules
import { NgxPageScrollModule } from 'ngx-page-scroll';

// internal modules
import { SharedModule } from '../shared/shared.module';

// interceptors
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AccessDeniedInterceptor } from './interceptors/access-denied.interceptor';

// guards
import { AuthNeededGuard } from './guards';

// services
import { coreServices } from './services';

// components
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { HeaderComponent } from './components/header/header.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SearchComponent } from './components/search/search.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { HelpDialogComponent } from './components/help-dialog/help-dialog.component';
import { ConfigurationService, loadConfiguration } from '@boards/configuration';

@NgModule({
  imports: [
    HttpClientModule,
    NgxPageScrollModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule
  ],
  declarations: [
    ConfirmDialogComponent,
    ErrorDialogComponent,
    HeaderComponent,
    HelpDialogComponent,
    PageNotFoundComponent,
    SearchComponent,
    NotificationsComponent
  ],
  exports: [HeaderComponent],
  providers: [
    ConfigurationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AccessDeniedInterceptor,
      multi: true
    },
    // guards
    AuthNeededGuard,
    ...coreServices
  ],
  entryComponents: [
    ConfirmDialogComponent,
    ErrorDialogComponent,
    HelpDialogComponent
  ]
})
export class CoreModule {}
