import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { EMPTY, from, Observable, of, throwError } from 'rxjs';
import { AuthOpsService } from '../../services/auth-ops.service';
import * as authAction from '../actions/auth-action/auth-action.actions';
import * as emailLogin from '../actions/email-password-login-action/email-password-login-action.actions';
import * as googleLoginOrSignUp from '../actions/google-redirect-login-or-signup-action/google-redirect-login-or-signup-action.actions';
import * as emailSignUp from '../actions/email-password-sign-up-action/email-password-sign-up-action.actions';
import * as logout from '../actions/logout-action/logout-action.actions';
import * as passwordReset from '../actions/password-reset-action/password-reset-action.actions';

import { AuthEffects } from './auth.effects';
import { User, UserCredential } from '@angular/fire/auth';
import { IAuthError, IUser } from '../../interfaces/auth.interface';
import { FrthUser } from '../../classes/userClass.class';

describe('AuthEffects', () => {
  let actions$: Observable<any>;
  let effects: AuthEffects;
  let authOpsSpyService: jasmine.SpyObj<AuthOpsService>;

  beforeEach(() => {
    const authOpsSpy = jasmine.createSpyObj('AuthOpsService', [
      'signInWithEmailAndPassword',
      'getAuthState',
      'createUserWithEmailAndPassword',
      'signInWithGoogleRedirect',
      'signOut',
      'sendPasswordResetEmail',
      'sendEmailVerification',
    ]);

    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        provideMockActions(() => actions$),
        { provide: AuthOpsService, useValue: authOpsSpy },
      ],
    });

    effects = TestBed.inject(AuthEffects);
    authOpsSpyService = TestBed.inject(
      AuthOpsService
    ) as jasmine.SpyObj<AuthOpsService>;
  });

  describe('auth$ effect', () => {
    it('should dispatch a ngxFireAuthAuthActionsSuccess from ngxFireAuthAuthActions', (done) => {
      actions$ = of(authAction.ngxFireAuthAuthActions());
      authOpsSpyService.getAuthState.and.returnValue(of(null));

      effects.ngxFrthauth$.subscribe((action) => {
        expect(authOpsSpyService.getAuthState).toHaveBeenCalled();
        expect(action).toEqual(authAction.ngxFireAuthAuthActionsFailure());
      });
      done();
    });

    it('should dispatch a ngxFireAuthAuthActionsSuccess from ngxFireAuthAuthActions with full user', (done) => {
      const user: User = {
        displayName: 'testDisplayName',
        email: 'testEmail',
        emailVerified: true,
        isAnonymous: false,
        metadata: {},
        phoneNumber: 'testPhoneNumber',
        photoURL: 'testPhotoURL',
        uid: 'testUid',
        providerId: 'testProviderId',
        tenantId: 'testTenantId',
        refreshToken: 'testRefreshToken',
        providerData: [],
      } as unknown as User;

      const frthUser: IUser = new FrthUser(user).getIUser();

      actions$ = of(authAction.ngxFireAuthAuthActions());
      authOpsSpyService.getAuthState.and.returnValue(of(user));
      effects.ngxFrthauth$.subscribe((action) => {
        expect(authOpsSpyService.getAuthState).toHaveBeenCalled();
        expect(action).toEqual(
          authAction.ngxFireAuthAuthActionsSuccess({ user: frthUser })
        );
      });
      done();
    });

    it('should dispatch a ngxFireAuthAuthActionsSuccess from ngxFireAuthAuthActions with partial user', (done) => {
      const user: User = {
        displayName: null,
        email: null,
        emailVerified: null,
        isAnonymous: false,
        metadata: {},
        phoneNumber: null,
        photoURL: null,
        uid: 'testUid',
        providerId: 'testProviderId',
        tenantId: 'testTenantId',
        refreshToken: 'testRefreshToken',
        providerData: [],
      } as unknown as User;

      const frthUser: IUser = new FrthUser(user).getIUser();

      actions$ = of(authAction.ngxFireAuthAuthActions());
      authOpsSpyService.getAuthState.and.returnValue(of(user));
      effects.ngxFrthauth$.subscribe((action) => {
        expect(authOpsSpyService.getAuthState).toHaveBeenCalled();
        expect(action).toEqual(
          authAction.ngxFireAuthAuthActionsSuccess({ user: frthUser })
        );
      });
      done();
    });
  });

  describe('emailLogin$ effect', () => {
    it('should dispatch a ngxFireAuthEmailPasswordLoginActionsSuccess from ngxFireAuthEmailPasswordLoginActions', (done) => {
      const email = 'testEmail';
      const password = 'testPassword';

      actions$ = of(
        emailLogin.ngxFireAuthEmailPasswordLoginActions({
          email,
          password,
        })
      );
      authOpsSpyService.signInWithEmailAndPassword.and.returnValue(
        of({} as UserCredential)
      );

      effects.ngxFrthemailLogin$.subscribe((action) => {
        expect(
          authOpsSpyService.signInWithEmailAndPassword
        ).toHaveBeenCalledWith(email, password);
        expect(action).toEqual(
          emailLogin.ngxFireAuthEmailPasswordLoginActionsSuccess()
        );
      });
      done();
    });

    it('should dispatch a ngxFireAuthEmailPasswordLoginActionsFailure from ngxFireAuthEmailPasswordLoginActions', (done) => {
      const email = 'testEmail2';
      const password = 'testPassword2';

      const error: Error = {
        message: 'testErrorMessage',
        name: 'testErrorName',
      };

      const expectedError: IAuthError = {
        code: error.name,
        message: error.message,
      };

      actions$ = of(
        emailLogin.ngxFireAuthEmailPasswordLoginActions({
          email,
          password,
        })
      );
      authOpsSpyService.signInWithEmailAndPassword.and.returnValue(
        throwError(() => error)
      );

      effects.ngxFrthemailLogin$.subscribe((action) => {
        expect(
          authOpsSpyService.signInWithEmailAndPassword
        ).toHaveBeenCalledWith(email, password);
        expect(action).toEqual(
          emailLogin.ngxFireAuthEmailPasswordLoginActionsFailure({
            error: expectedError,
          })
        );
      });
      done();
    });
  });

  describe('emailLoginSuccess$ effect', () => {
    it('should dispatch a ngxFireAuthAuthActions from ngxFireAuthEmailPasswordLoginActionsSuccess', (done) => {
      actions$ = of(emailLogin.ngxFireAuthEmailPasswordLoginActionsSuccess());
      effects.ngxFrthemailLoginSuccess$.subscribe((action) => {
        expect(action).toEqual(authAction.ngxFireAuthAuthActions());
      });
      done();
    });
  });

  describe('emailSignUp$ effect', () => {
    it('should dispatch a ngxFireAuthEmailPasswordSignUpActionsSuccess from ngxFireAuthEmailPasswordSignUpActions', (done) => {
      const creds = { email: 'testEmail3', password: 'testPassword3' };

      const user: User = {
        displayName: null,
        email: 'testEmail3',
        emailVerified: false,
        isAnonymous: false,
        metadata: {},
        phoneNumber: null,
        photoURL: null,
        uid: 'testUid3',
        providerId: 'testProviderId',
        tenantId: 'testTenantId',
        refreshToken: 'testRefreshToken',
        providerData: [],
      } as unknown as User;

      const userCred: UserCredential = {
        user,
        operationType: 'link',
        providerId: 'testProviderId',
      };

      actions$ = of(emailSignUp.ngxFireAuthEmailPasswordSignUpActions(creds));
      authOpsSpyService.createUserWithEmailAndPassword.and.returnValue(
        of(userCred)
      );

      effects.ngxFrthemailSignUp$.subscribe((action) => {
        expect(
          authOpsSpyService.createUserWithEmailAndPassword
        ).toHaveBeenCalledWith(creds.email, creds.password);
        expect(action).toEqual(
          emailSignUp.ngxFireAuthEmailPasswordSignUpActionsSuccess()
        );
      });
      done();
    });

    it('should dispatch a ngxFireAuthEmailPasswordSignUpActionsFailure from ngxFireAuthEmailPasswordSignUpActions', (done) => {
      const creds = { email: 'testEmail4', password: 'testPassword4' };
      actions$ = of(emailSignUp.ngxFireAuthEmailPasswordSignUpActions(creds));
      const error: Error = {
        message: 'testErrorMessage2',
        name: 'testErrorName2',
      };
      const expectedError: IAuthError = {
        code: error.name,
        message: error.message,
      };
      authOpsSpyService.createUserWithEmailAndPassword.and.returnValue(
        throwError(() => error)
      );
      effects.ngxFrthemailSignUp$.subscribe((action) => {
        expect(
          authOpsSpyService.createUserWithEmailAndPassword
        ).toHaveBeenCalledWith(creds.email, creds.password);
        expect(action).toEqual(
          emailSignUp.ngxFireAuthEmailPasswordSignUpActionsFailure({
            error: expectedError,
          })
        );
      });
      done();
    });
  });

  describe('emailSignUpSuccess$ effect', () => {
    it('should dispatch a ngxFireAuthAuthActions from ngxFireAuthEmailPasswordSignUpActionsSuccess', (done) => {
      const user: User = {
        displayName: null,
        email: 'testEmail4',
        emailVerified: false,
        isAnonymous: false,
        metadata: {},
        phoneNumber: null,
        photoURL: null,
        uid: 'testUid4',
        providerId: 'testProviderId',
        tenantId: 'testTenantId',
        refreshToken: 'testRefreshToken',
        providerData: [],
      } as unknown as User;

      actions$ = of(emailSignUp.ngxFireAuthEmailPasswordSignUpActionsSuccess());
      authOpsSpyService.sendEmailVerification.and.returnValue(
        Promise.resolve()
      );
      effects.ngxFrthemailSignUpSuccess$.subscribe((action) => {
        expect(authOpsSpyService.sendEmailVerification).toHaveBeenCalled();
        expect(action).toEqual(authAction.ngxFireAuthAuthActions());
      });
      done();
    });
  });

  describe('googleLoginOrSignUp$ effect', () => {
    it('should dispatch a ngxFireAuthGoogleLoginOrSignUpActionsRedirectSuccess from ngxFireAuthGoogleLoginOrSignUpActions', (done) => {
      actions$ = of(
        googleLoginOrSignUp.ngxFireAuthGoogleRedirectLoginOrSignUpActions()
      );
      authOpsSpyService.signInWithGoogleRedirect.and.returnValue(EMPTY);
      effects.ngxFrthgoogleLoginOrSignUp$.subscribe((action) => {
        expect(authOpsSpyService.signInWithGoogleRedirect).toHaveBeenCalled();
        expect(action).toEqual(
          googleLoginOrSignUp.ngxFireAuthGoogleRedirectLoginOrSignUpActionsRedirectSuccess()
        );
      });
      done();
    });

    //TODO: test for ngxFireAuthGoogleRedirectLoginOrSignUpActionsRedirectFailure
  });

  describe('logout$ effect', () => {
    it('should dispatch a ngxFireAuthLogoutActionsSuccess from ngxFireAuthLogoutActions', (done) => {
      actions$ = of(logout.ngxFireAuthLogoutActions());
      authOpsSpyService.signOut.and.returnValue(from(Promise.resolve()));
      effects.ngxFrthlogout$.subscribe((action) => {
        expect(authOpsSpyService.signOut).toHaveBeenCalled();
        expect(action).toEqual(logout.ngxFireAuthLogoutActionsSuccess());
      });
      done();
    });

    it('should dispatch a ngxFireAuthLogoutActionsFailure from ngxFireAuthLogoutActions', (done) => {
      actions$ = of(logout.ngxFireAuthLogoutActions());

      authOpsSpyService.signOut.and.returnValue(throwError(() => 'error'));
      effects.ngxFrthlogout$.subscribe((action) => {
        expect(authOpsSpyService.signOut).toHaveBeenCalled();
        expect(action).toEqual(logout.ngxFireAuthLogoutActionsFailure());
      });
      done();
    });
  });

  describe('passwordReset$ effect', () => {
    it('should dispatch a ngxFireAuthPasswordResetActionsSuccess from ngxFireAuthPasswordResetActions', (done) => {
      const email = 'testEmail5';
      actions$ = of(passwordReset.ngxFireAuthPasswordResetActions({ email }));
      authOpsSpyService.sendPasswordResetEmail.and.returnValue(
        from(Promise.resolve())
      );

      effects.ngxFrthpasswordReset$.subscribe((action) => {
        expect(authOpsSpyService.sendPasswordResetEmail).toHaveBeenCalledWith(
          email
        );
        expect(action).toEqual(
          passwordReset.ngxFireAuthPasswordResetActionsSuccess()
        );
      });
      done();
    });

    it('should dispatch a ngxFireAuthPasswordResetActionsFailure from ngxFireAuthPasswordResetActions', (done) => {
      const email = 'testEmail6';
      actions$ = of(passwordReset.ngxFireAuthPasswordResetActions({ email }));
      const error: Error = {
        message: 'testErrorMessage3',
        name: 'testErrorName3',
      };
      const expectedError: IAuthError = {
        code: error.name,
        message: error.message,
      };
      authOpsSpyService.sendPasswordResetEmail.and.returnValue(
        throwError(() => error)
      );
      effects.ngxFrthpasswordReset$.subscribe((action) => {
        expect(authOpsSpyService.sendPasswordResetEmail).toHaveBeenCalledWith(
          email
        );
        expect(action).toEqual(
          passwordReset.ngxFireAuthPasswordResetActionsFailure({
            error: expectedError,
          })
        );
      });
      done();
    });
  });
});
