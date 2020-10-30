import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { reducers, metaReducers } from './reducers';

import { ArchiveEffect } from './archive';
import { AuthEffect } from './auth';
import { boardEffects } from './board';
import { BoardArchiveEffect } from './board-archive';
import { BoardChecklistEffect } from './board-checklist';
import { BoardCommentEffect } from './board-comment';
import { BoardSummaryEffect } from './board-summary';
import { BoardTeamEffect } from './board-team';
import { BoardTemplateEffect } from './board-template';
import { CardAttachmentEffect } from './card-attachment';
import { CardChecklistEffect } from './card-checklist';
import { CardCommentEffect } from './card-comment';
import { RedirectEffect } from './redirect';
import { TeamsEffects } from './team';
import { UIEffect } from './ui';
import { UserEffect } from './user';

import { AppStoreService } from './app-store.service';

import { environment } from '@env/environment';

@NgModule({
  imports: [
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router'
    }),
    StoreDevtoolsModule.instrument({
      name: 'Store DevTools',
      logOnly: environment.production
    }),
    EffectsModule.forRoot([
      ArchiveEffect,
      AuthEffect,
      BoardArchiveEffect,
      BoardChecklistEffect,
      BoardCommentEffect,
      ...boardEffects,
      BoardSummaryEffect,
      BoardTeamEffect,
      BoardTemplateEffect,
      CardAttachmentEffect,
      CardChecklistEffect,
      CardCommentEffect,
      RedirectEffect,
      TeamsEffects,
      UIEffect,
      UserEffect
    ])
  ],
  declarations: [],
  providers: [AppStoreService]
})
export class AppStoreModule {}
