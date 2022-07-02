import { createAction, props } from '@ngrx/store';
import { IAuthError } from '../../../interfaces/auth.interface';

export const ngxFireAuthGoogleRedirectLoginOrSignUpActions = createAction(
  '[GoogleRedirectLoginAction] ngxFireAuth GoogleRedirectLoginActions'
);

export const ngxFireAuthGoogleRedirectLoginOrSignUpActionsRedirectSuccess =
  createAction(
    '[GoogleRedirectLoginAction] ngxFireAuth GoogleRedirectLoginActionsRedirect Success'
  );
