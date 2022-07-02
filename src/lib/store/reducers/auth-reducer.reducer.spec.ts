import {
  authReducer,
  initialAuthState,
  stateCopy,
} from './auth-reducer.reducer';
import * as auth from '../actions/auth-action/auth-action.actions';
import * as emailLogin from '../actions/email-password-login-action/email-password-login-action.actions';
import * as googleLoginOrSignUp from '../actions/google-redirect-login-or-signup-action/google-redirect-login-or-signup-action.actions';
import * as emailSignUp from '../actions/email-password-sign-up-action/email-password-sign-up-action.actions';
import * as logout from '../actions/logout-action/logout-action.actions';
import * as passwordReset from '../actions/password-reset-action/password-reset-action.actions';
import * as clearError from '../actions/clear-error/clear-error-action.actions';
import { IAuthState } from '../../interfaces/auth.interface';
import { IEmailPassword } from '../../interfaces/email-password-login.interfaces';

describe('deepCopy state function', () => {
  it('should return a copy of the state', () => {
    const state: IAuthState = {
      error: {
        code: 'some error',
        message: 'some message',
      },
      loading: false,
      user: {
        email: 'some email',
        uid: 'some uid',
        providerId: 'some provider id',
      },
    };
    const copy = stateCopy(state);
    expect(copy).toEqual(state);
    state.error!.code = 'some other error';
    state.user!.email = 'some other email';
    expect(copy.error!.code).not.toBe(state.error!.code);
    expect(copy.user!.email).not.toBe(state.user!.email);
    expect(copy).not.toEqual(state);
  });
});

describe('AuthReducer Reducer', () => {
  const states: { [key: string]: IAuthState } = {
    initial: initialAuthState,
    authenticatedNotLoading: {
      error: null,
      loading: false,
      user: {
        uid: 'test-uid',
        displayName: 'test-display-name',
        providerId: 'test-provider-id',
      },
    },
    authenticatedLoading: {
      error: null,
      loading: true,
      user: {
        uid: 'test-uid',
        displayName: 'test-display-name',
        providerId: 'test-provider-id2',
      },
    },
    erroredNotLoading: {
      error: {
        code: 'test-code',
        message: 'test-message',
      },
      loading: false,
      user: null,
    },
    erroredLoading: {
      error: {
        code: 'test-code',
        message: 'test-message',
      },
      loading: true,
      user: null,
    },
    loading: {
      error: null,
      loading: true,
      user: null,
    },
  };

  describe('an unknown action', () => {
    const action = {} as any;

    for (const stateName in states) {
      it(`should return the previous ${stateName}`, () => {
        expect(authReducer(states[stateName], action)).toEqual(
          states[stateName]
        );
      });
    }
  });

  describe('ngxFireAuthAuthActions', () => {
    const action = auth.ngxFireAuthAuthActions();

    for (const stateName in states) {
      it(`should set the loading to true from ${stateName}`, () => {
        expect(authReducer(states[stateName], action)).toEqual({
          user: states[stateName].user,
          error: states[stateName].error,
          loading: true,
        });
      });
    }
  });

  describe('ngxFireAuthAuthActionsSuccess', () => {
    const user = {
      uid: 'test-uid2',
      displayName: 'test-display-name2',
      providerId: 'test-provider-id3',
    };
    const action = auth.ngxFireAuthAuthActionsSuccess({
      user,
    });

    for (const stateName in states) {
      it(`should authenticate from ${stateName} (loading: false, error: null, user)`, () => {
        expect(authReducer(states[stateName], action)).toEqual({
          loading: false,
          error: null,
          user,
        });
      });
    }
  });

  describe('ngxFireAuthAuthActionsFailure', () => {
    const action = auth.ngxFireAuthAuthActionsFailure();

    for (const stateName in states) {
      it(`should set the user to null from ${stateName}`, () => {
        expect(authReducer(states[stateName], action)).toEqual({
          loading: false,
          error: states[stateName].error,
          user: null,
        });
      });
    }
  });

  describe('ngxFireAuthEmailPasswordLoginActions', () => {
    const emailPassword: IEmailPassword = {
      email: 'test-email2',
      password: 'test-password2',
    };
    const action =
      emailLogin.ngxFireAuthEmailPasswordLoginActions(emailPassword);

    for (const stateName in states) {
      it(`should set the loading to true from ${stateName}`, () => {
        expect(authReducer(states[stateName], action)).toEqual({
          user: states[stateName].user,
          error: states[stateName].error,
          loading: true,
        });
      });
    }
  });

  describe('ngxFireAuthEmailPasswordLoginActionsSuccess', () => {
    const action = emailLogin.ngxFireAuthEmailPasswordLoginActionsSuccess();

    for (const stateName in states) {
      it(`should set loading to false from ${stateName}`, () => {
        expect(authReducer(states[stateName], action)).toEqual({
          user: states[stateName].user,
          error: states[stateName].error,
          loading: false,
        });
      });
    }
  });

  describe('ngxFireAuthEmailPasswordLoginActionsFailure', () => {
    const error = {
      code: 'test-code3',
      message: 'test-message3',
    };
    const action = emailLogin.ngxFireAuthEmailPasswordLoginActionsFailure({
      error,
    });

    for (const stateName in states) {
      it(`should set the error from ${stateName} (loading: false, error)`, () => {
        expect(authReducer(states[stateName], action)).toEqual({
          user: states[stateName].user,
          loading: false,
          error,
        });
      });
    }
  });

  describe('ngxFireAuthEmailPasswordSignUpActions', () => {
    const emailPassword: IEmailPassword = {
      email: 'test-emaile3',
      password: 'test-password3',
    };
    const action =
      emailSignUp.ngxFireAuthEmailPasswordSignUpActions(emailPassword);

    for (const stateName in states) {
      it(`should set the loading to true from ${stateName}`, () => {
        expect(authReducer(states[stateName], action)).toEqual({
          error: states[stateName].error,
          user: states[stateName].user,
          loading: true,
        });
      });
    }
  });

  describe('ngxFireAuthEmailPasswordSignUpActionsSuccess', () => {
    const action = emailSignUp.ngxFireAuthEmailPasswordSignUpActionsSuccess();

    for (const stateName in states) {
      it(`should set loading to false from ${stateName}`, () => {
        expect(authReducer(states[stateName], action)).toEqual({
          error: states[stateName].error,
          user: states[stateName].user,
          loading: false,
        });
      });
    }
  });

  describe('ngxFireAuthEmailPasswordSignUpActionsFailure', () => {
    const error = {
      code: 'test-code4',
      message: 'test-message4',
    };
    const action = emailSignUp.ngxFireAuthEmailPasswordSignUpActionsFailure({
      error,
    });

    for (const stateName in states) {
      it(`should set the error from ${stateName} (loading: false, error)`, () => {
        expect(authReducer(states[stateName], action)).toEqual({
          error,
          user: states[stateName].user,
          loading: false,
        });
      });
    }
  });

  describe('ngxFireAuthLogoutActions', () => {
    const action = logout.ngxFireAuthLogoutActions();

    for (const stateName in states) {
      it(`should set the loading to true from ${stateName}`, () => {
        expect(authReducer(states[stateName], action)).toEqual({
          user: states[stateName].user,
          error: states[stateName].error,
          loading: true,
        });
      });
    }
  });

  describe('ngxFireAuthLogoutActionsSuccess', () => {
    const action = logout.ngxFireAuthLogoutActionsSuccess();

    for (const stateName in states) {
      it(`should set authState to initialState from ${stateName}`, () => {
        expect(authReducer(states[stateName], action)).toEqual(
          initialAuthState
        );
      });
    }
  });

  describe('ngxFireAuthLogoutActionsFailure', () => {
    const action = logout.ngxFireAuthLogoutActionsFailure();

    for (const stateName in states) {
      it(`should set the error from ${stateName} (loading: false, error)`, () => {
        expect(authReducer(states[stateName], action)).toEqual({
          user: states[stateName].user,
          loading: false,
          error: states[stateName].error,
        });
      });
    }
  });

  describe('ngxFireAuthPasswordResetActions', () => {
    const email: string = 'test-email6';
    const action = passwordReset.ngxFireAuthPasswordResetActions({ email });

    for (const stateName in states) {
      it(`should set the loading to true from ${stateName}`, () => {
        expect(authReducer(states[stateName], action)).toEqual({
          user: states[stateName].user,
          error: states[stateName].error,
          loading: true,
        });
      });
    }
  });

  describe('ngxFireAuthPasswordResetActionsSuccess', () => {
    const action = passwordReset.ngxFireAuthPasswordResetActionsSuccess();

    for (const stateName in states) {
      it(`should set loading to false from ${stateName}`, () => {
        expect(authReducer(states[stateName], action)).toEqual({
          user: states[stateName].user,
          error: states[stateName].error,
          loading: false,
        });
      });
    }
  });

  describe('ngxFireAuthPasswordResetActionsFailure', () => {
    const error = {
      code: 'test-code6',
      message: 'test-message6',
    };
    const action = passwordReset.ngxFireAuthPasswordResetActionsFailure({
      error,
    });

    for (const stateName in states) {
      it(`should set the error from ${stateName} (loading: false, error)`, () => {
        expect(authReducer(states[stateName], action)).toEqual({
          user: states[stateName].user,
          loading: false,
          error,
        });
      });
    }
  });

  describe('ngxFireAuthGoogleRedirectLoginOrSignUpActions', () => {
    const action =
      googleLoginOrSignUp.ngxFireAuthGoogleRedirectLoginOrSignUpActions();

    for (const stateName in states) {
      it(`should set the loading to true from ${stateName}`, () => {
        expect(authReducer(states[stateName], action)).toEqual({
          user: states[stateName].user,
          error: states[stateName].error,
          loading: true,
        });
      });
    }
  });

  describe('ngxFireAuthGoogleRedirectLoginOrSignUpActionsRedirectSuccess', () => {
    const action =
      googleLoginOrSignUp.ngxFireAuthGoogleRedirectLoginOrSignUpActionsRedirectSuccess();

    for (const stateName in states) {
      it(`should set loading to false from ${stateName}`, () => {
        expect(authReducer(states[stateName], action)).toEqual({
          user: states[stateName].user,
          error: states[stateName].error,
          loading: false,
        });
      });
    }
  });

  describe('ngxFireAuthClearErrorActions', () => {
    const action = clearError.ngxFireAuthClearErrorActions();

    for (const stateName in states) {
      it(`should set error to null from ${stateName}`, () => {
        expect(authReducer(states[stateName], action)).toEqual({
          user: states[stateName].user,
          error: null,
          loading: states[stateName].loading,
        });
      });
    }
  });
});
