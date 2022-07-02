import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { FrthManagerState } from '../interfaces/FrthState.interface';
import { NgxFireAuthManagerService } from './ngx-fire-auth.service';
import * as auth from '../store/actions/auth-action/auth-action.actions';
import * as emailLogin from '../store/actions/email-password-login-action/email-password-login-action.actions';
import * as googleLoginOrSignUp from '../store/actions/google-redirect-login-or-signup-action/google-redirect-login-or-signup-action.actions';
import * as emailSignUp from '../store/actions/email-password-sign-up-action/email-password-sign-up-action.actions';
import * as logout from '../store/actions/logout-action/logout-action.actions';
import * as passwordReset from '../store/actions/password-reset-action/password-reset-action.actions';
import * as clearError from '../store/actions/clear-error/clear-error-action.actions';

import {
  AuthStateSelector,
  ErrorSelector,
  LoadingSelector,
  UserSelector,
} from '../store/selectors/auth.selector';

describe('NgxFireAuthService', () => {
  let service: NgxFireAuthManagerService;
  let store: MockStore;

  beforeEach(() => {
    const initialState: FrthManagerState = {
      auth: {
        user: null,
        error: null,
        loading: false,
      },
    };

    TestBed.configureTestingModule({
      providers: [
        NgxFireAuthManagerService,
        provideMockStore({ initialState }),
      ],
    });
    service = TestBed.inject(NgxFireAuthManagerService);
    store = TestBed.inject(MockStore);
  });

  it('should dispatch ngxFireAuthEmailPasswordLoginActions', (done) => {
    const email = 'testmail';
    const password = 'testpassword';
    service.loginWithEmailAndPassword(email, password);
    store.scannedActions$.subscribe((actions) => {
      expect(actions).toEqual(
        emailLogin.ngxFireAuthEmailPasswordLoginActions({ email, password })
      );
    });
    done();
  });

  it('should dispatch ngxFireAuthGoogleRedirectLoginOrSignUpActions', (done) => {
    service.loginOrSignInWithGoogle();
    store.scannedActions$.subscribe((actions) => {
      expect(actions).toEqual(
        googleLoginOrSignUp.ngxFireAuthGoogleRedirectLoginOrSignUpActions()
      );
    });
    done();
  });

  it('should dispatch ngxFireAuthEmailPasswordSignUpActions', (done) => {
    const email = 'testmail';
    const password = 'testpassword';
    service.signUpWithEmailAndPassword(email, password);
    store.scannedActions$.subscribe((actions) => {
      expect(actions).toEqual(
        emailSignUp.ngxFireAuthEmailPasswordSignUpActions({ email, password })
      );
    });
    done();
  });

  it('should dispatch ngxFireAuthPasswordResetActions', (done) => {
    const email = 'testmail';
    service.sendPasswordResetEmail(email);
    store.scannedActions$.subscribe((actions) => {
      expect(actions).toEqual(
        passwordReset.ngxFireAuthPasswordResetActions({ email })
      );
    });
    done();
  });

  it('should dispatch ngxFireAuthAuthActions', (done) => {
    service.authenticate();
    store.scannedActions$.subscribe((actions) => {
      expect(actions).toEqual(auth.ngxFireAuthAuthActions());
    });
    done();
  });

  it('should dispatch ngxFireAuthLogoutActions', (done) => {
    service.logout();
    store.scannedActions$.subscribe((actions) => {
      expect(actions).toEqual(logout.ngxFireAuthLogoutActions());
    });
    done();
  });

  it('should dispatch ngxFireAuthClearErrorActions', (done) => {
    service.clearAuthError();
    store.scannedActions$.subscribe((actions) => {
      expect(actions).toEqual(clearError.ngxFireAuthClearErrorActions());
    });
    done();
  });

  it('should get a {null, null, false} AuthState', (done) => {
    store.overrideSelector(AuthStateSelector, {
      user: null,
      error: null,
      loading: false,
    });
    service.getAuth().subscribe((authState) => {
      expect(authState).toEqual({ user: null, error: null, loading: false });
    });
    done();
  });

  it('should get a {user, null, false} AuthState', (done) => {
    const authStateData = {
      user: { email: 'testmail', uid: 'testuid', providerId: 'testproviderid' },
      error: null,
      loading: true,
    };
    store.overrideSelector(AuthStateSelector, authStateData);
    service.getAuth().subscribe((authState) => {
      expect(authState).toEqual(authStateData);
    });
    done();
  });

  it('should get a null user', (done) => {
    store.overrideSelector(UserSelector, null);
    service.getUser().subscribe((user) => {
      expect(user).toBeNull();
    });
    done();
  });

  it('should get a not null user', (done) => {
    store.overrideSelector(UserSelector, {
      email: 'testmail',
      uid: 'testuid',
      providerId: 'testproviderid',
    });
    service.getUser().subscribe((user) => {
      expect(user).toEqual({
        email: 'testmail',
        uid: 'testuid',
        providerId: 'testproviderid',
      });
    });
    done();
  });

  it('should get a null error', (done) => {
    store.overrideSelector(ErrorSelector, null);
    service.getAuthError().subscribe((error) => {
      expect(error).toBeNull();
    });
    done();
  });

  it('should get a not null error', (done) => {
    store.overrideSelector(ErrorSelector, {
      code: 'testcode',
      message: 'testmessage',
    });
    service.getAuthError().subscribe((error) => {
      expect(error).toEqual({ code: 'testcode', message: 'testmessage' });
    });
    done();
  });

  it('should get a false loading', (done) => {
    store.overrideSelector(LoadingSelector, false);
    service.getLoading().subscribe((loading) => {
      expect(loading).toBeFalse();
    });
    done();
  });

  it('should get a true loading', (done) => {
    store.overrideSelector(LoadingSelector, true);
    service.getLoading().subscribe((loading) => {
      expect(loading).toBeTrue();
    });
    done();
  });
});
