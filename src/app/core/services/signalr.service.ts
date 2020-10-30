import { Injectable, Inject } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { AuthInfoService } from './auth-info.service';
import { environment } from '../../../environments/environment';
import { IState } from '../../store/state.interface';
import { Store } from '@ngrx/store';
import { WindowRefService } from './window-ref.service';
import { Configuration, ConfigurationService } from '@boards/configuration';
import { filter, first, tap } from 'rxjs/operators';

// Service took from here: https://blog.sstorie.com/integrating-angular-2-and-signalr-part-2-of-2/

export enum ConnectionState {
  Connecting = 1,
  Connected = 2,
  Reconnecting = 3,
  Disconnected = 4
}

export class ChannelConfig {
  url: string;
  hubName: string;
  channel: string;
}

/**
 * SignalrService is a wrapper around the functionality that SignalR
 * provides to expose the ideas of channels and events. With this service
 * you can subscribe to specific channels (or groups in signalr speak) and
 * use observables to react to specific events sent out on those channels.
 */
@Injectable()
export class SignalrService {
  /**
   * starting$ is an observable available to know if the signalr
   * connection is ready or not. On a successful connection this
   * stream will emit a value.
   */
  starting$: Observable<any>;
  boardChannel$: Observable<any>;

  /**
   * connectionState$ provides the current state of the underlying
   * connection as an observable stream.
   */
  connectionState$: Observable<ConnectionState>;

  /**
   * error$ provides a stream of any error messages that occur on the
   * SignalR connection
   */
  error$: Observable<string>;

  // These are used to feed the public observables
  //
  private connectionStateSubject = new Subject<ConnectionState>();
  private startingSubject = new Subject<any>();
  private errorSubject = new Subject<any>();

  // These are used to track the internal SignalR state
  //
  private hubConnection: any;
  private hubProxy: any;
  private _window;

  channelConfig: ChannelConfig;
  boardID;
  currentSingalRConnectionID;

  private executeSubject = new Subject();

  constructor(
    private store: Store<IState>,
    private authInfoService: AuthInfoService,
    windowRef: WindowRefService,
    private config: ConfigurationService
  ) {
    this._window = windowRef.nativeWindow;
    if (
      this._window.$ === undefined ||
      this._window.$.hubConnection === undefined
    ) {
      throw new Error(
        `The variable '$' or the .hubConnection() function are not defined...please check the SignalR scripts have been loaded properly`
      );
    }

    // Set up our observables

    this.config.config
      .pipe(
        filter((config) => !!config),
        tap((config) => {
          this.setupObservables(config);
        })
      )
      .subscribe();
  }

  setupObservables(config: Configuration) {
    this.connectionState$ = this.connectionStateSubject.asObservable();
    this.error$ = this.errorSubject.asObservable();
    this.starting$ = this.startingSubject.asObservable();
    this.boardChannel$ = this.executeSubject.asObservable();
    this.channelConfig = new ChannelConfig();
    this.hubConnection = this._window.$.hubConnection();

    this.channelConfig.hubName = 'boardChannelHub';
    this.channelConfig.url = `${config.webApiBaseUrl}/signalr`;
    this.hubConnection.url = this.channelConfig.url;
    this.hubProxy = this.hubConnection.createHubProxy(
      this.channelConfig.hubName
    );

    // Define handlers for the connection state events
    //
    this.hubConnection.stateChanged((state: any) => {
      let newState = ConnectionState.Connecting;

      switch (state.newState) {
        case this._window.$.signalR.connectionState.connecting:
          newState = ConnectionState.Connecting;
          break;
        case this._window.$.signalR.connectionState.connected:
          newState = ConnectionState.Connected;
          break;
        case this._window.$.signalR.connectionState.reconnecting:
          newState = ConnectionState.Reconnecting;
          break;
        case this._window.$.signalR.connectionState.disconnected:
          newState = ConnectionState.Disconnected;
          break;
      }

      // Push the new state on our subject
      //
      this.connectionStateSubject.next(newState);
    });

    // Define handlers for any errors
    //
    this.hubConnection.error((error: any) => {
      // Push the error on our subject
      //
      this.errorSubject.next(error);
    });
    // This method acts like a broker for incoming messages.
    // 'Execute' is the method at the boards API
    this.hubProxy.on('execute', (message: string) => {
      this.executeSubject.next(JSON.parse(message));
    });

    this.error$.subscribe(
      (error: any) => {
        // console.warn(error);
      },
      (error: any) => {
        // console.error("errors$ error", error);
      }
    );

    // Wire up a handler for the starting$ observable to log the
    //  success/fail result
    //
    this.starting$.subscribe(
      () => {
        /* console.log("signalr service has been started"); */
      },
      () => {
        // console.warn("signalr service failed to start!");
      }
    );
  }

  getCurrentBoardChannelConnectionID() {
    return this.currentSingalRConnectionID;
  }

  startBoardChannelHub(boardID) {
    this.boardID = boardID;
    this.hubConnection.qs = {
      auth_token: this.authInfoService.getToken(),
      board: this.boardID
    };

    // Now we only want the connection started once, so we have a special
    //  starting$ observable that clients can subscribe to know know if
    //  if the startup sequence is done.
    //
    // If we just mapped the startBoardChannelHub() promise to an observable, then any time
    //  a client subscried to it the startBoardChannelHub sequence would be triggered
    //  again since it's a cold observable.
    //
    // this.hubConnection.startBoardChannelHub({ transport: 'longPolling' })
    this.hubConnection
      .start()
      .done(() => {
        this.currentSingalRConnectionID = this.hubConnection.id;
        this.startingSubject.next();
      })
      .fail((error: any) => {
        this.startingSubject.error(error);
      });
    // Subscribe to Execute Function on SignalR Server
    return this.boardChannel$.subscribe((message) => {
      this.store.dispatch({
        type: message.command,
        payload: { inner: message.payload }
      });
    });
  }

  stopBoardChannelHub() {
    this.hubConnection.stop();
  }

  // Not quite sure how to handle this (if at all) since there could be
  //  more than 1 caller subscribed to an observable we created
  //
  // unsubscribe(channel: string): Rx.Observable<any> {
  //     this.observables = this.observables.filter((x: ChannelObservable) => {
  //         return x.channel === channel;
  //     });
  // }
}
