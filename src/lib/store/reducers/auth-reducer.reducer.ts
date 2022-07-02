import { createReducer, on } from '@ngrx/store';
import { IAuthError, IAuthState, IUser } from '../../interfaces/auth.interface';
import * as auth from '../actions/auth-action/auth-action.actions';
import * as emailLogin from '../actions/email-password-login-action/email-password-login-action.actions';
import * as googleLoginOrSignUp from '../actions/google-redirect-login-or-signup-action/google-redirect-login-or-signup-action.actions';
import * as emailSignUp from '../actions/email-password-sign-up-action/email-password-sign-up-action.actions';
import * as logout from '../actions/logout-action/logout-action.actions';
import * as passwordReset from '../actions/password-reset-action/password-reset-action.actions';
import * as clearError from '../actions/clear-error/clear-error-action.actions';

export const authReducerFeatureKey = 'authReducer';

export const initialAuthState: IAuthState = {
  error: null,
  loading: false,
  user: null,
};

function deepCopyError(error: IAuthError | null): IAuthError | null {
  if (error) {
    return { ...error };
  } else {
    return null;
  }
}

function deepCopyUser(user: IUser | null): IUser | null {
  if (user) {
    return { ...user };
  } else {
    return null;
  }
}

export function stateCopy(state: IAuthState): IAuthState {
  return {
    ...state,
    error: deepCopyError(state.error),
    user: deepCopyUser(state.user),
  };
}

export const authReducer = createReducer(
  initialAuthState,

  /* 
  AuthActions
  */
  on(auth.ngxFireAuthAuthActions, (state) => ({
    ...stateCopy(state),
    loading: true,
  })),
  on(auth.ngxFireAuthAuthActionsSuccess, (state, { user }) => ({
    ...stateCopy(state),
    error: null,
    user,
    loading: false,
  })),
  on(auth.ngxFireAuthAuthActionsFailure, (state) => ({
    ...stateCopy(state),
    user: null,
    loading: false,
  })),

  /*
  EmailPasswordLoginActions
  */
  on(emailLogin.ngxFireAuthEmailPasswordLoginActions, (state) => ({
    ...stateCopy(state),
    loading: true,
  })),
  on(emailLogin.ngxFireAuthEmailPasswordLoginActionsSuccess, (state) => ({
    ...stateCopy(state),
    loading: false,
  })),
  on(
    emailLogin.ngxFireAuthEmailPasswordLoginActionsFailure,
    (state, { error }) => ({
      ...stateCopy(state),
      error,
      loading: false,
    })
  ),

  /*
  GoogleRedirectLoginActions
  */
  on(
    googleLoginOrSignUp.ngxFireAuthGoogleRedirectLoginOrSignUpActions,
    (state) => ({
      ...stateCopy(state),
      loading: true,
    })
  ),
  on(
    googleLoginOrSignUp.ngxFireAuthGoogleRedirectLoginOrSignUpActionsRedirectSuccess,
    (state) => ({
      ...stateCopy(state),
      loading: false,
    })
  ),

  /* 
  EmailPasswordSignUpActions
  */
  on(emailSignUp.ngxFireAuthEmailPasswordSignUpActions, (state) => ({
    ...stateCopy(state),
    loading: true,
  })),
  on(emailSignUp.ngxFireAuthEmailPasswordSignUpActionsSuccess, (state) => ({
    ...stateCopy(state),
    loading: false,
  })),
  on(
    emailSignUp.ngxFireAuthEmailPasswordSignUpActionsFailure,
    (state, { error }) => ({
      ...stateCopy(state),
      error,
      loading: false,
    })
  ),

  /* 
  LogoutActions
  */
  on(logout.ngxFireAuthLogoutActions, (state) => ({
    ...stateCopy(state),
    loading: true,
  })),
  on(logout.ngxFireAuthLogoutActionsSuccess, (_state) => initialAuthState),
  on(logout.ngxFireAuthLogoutActionsFailure, (state) => ({
    ...stateCopy(state),
    loading: false,
  })),

  /*
  PasswordResetActions
  */
  on(passwordReset.ngxFireAuthPasswordResetActions, (state) => ({
    ...stateCopy(state),
    loading: true,
  })),
  on(passwordReset.ngxFireAuthPasswordResetActionsSuccess, (state) => ({
    ...stateCopy(state),
    loading: false,
  })),
  on(
    passwordReset.ngxFireAuthPasswordResetActionsFailure,
    (state, { error }) => ({
      ...stateCopy(state),
      error,
      loading: false,
    })
  ),

  /*
  ClearErrorActions
  */
  on(clearError.ngxFireAuthClearErrorActions, (state) => ({
    ...stateCopy(state),
    error: null,
  }))
);
