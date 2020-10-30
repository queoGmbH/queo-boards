import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from './core/core.module';

import { GlobalErrorHandler } from './core/handlers/global-error.handler';

import { AppStoreModule } from './store/app-store.module';
import { AppRoutingModule } from './app-routing.module';

import { LoginModule } from './features/login/login.module';

import { AppComponent } from './app.component';

import {
  ErrorHandlingService,
  SignalrService,
  WindowRefService
} from './core/services';
import { ConfigurationService, loadConfiguration } from '@boards/configuration';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    LoginModule,
    AppRoutingModule,
    AppStoreModule
  ],
  declarations: [AppComponent],
  providers: [
    ConfigurationService,
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfiguration,
      deps: [ConfigurationService],
      multi: true
    },
    Title,
    SignalrService,
    WindowRefService,
    ErrorHandlingService,
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
