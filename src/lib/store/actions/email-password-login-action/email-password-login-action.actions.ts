import { createAction, props } from '@ngrx/store';
import { IAuthError } from '../../../interfaces/auth.interface';

import { IEmailPassword } from '../../../interfaces/email-password-login.interfaces';

/* loaded when user click on the login button */
export const ngxFireAuthEmailPasswordLoginActions = createAction(
  '[EmailPasswordLoginAction] ngxFireAuth EmailPasswordLoginActions',
  props<IEmailPassword>()
);

/* loaded if login with email and password is successful */
export const ngxFireAuthEmailPasswordLoginActionsSuccess = createAction(
  '[EmailPasswordLoginAction] ngxFireAuth EmailPasswordLoginActions Success'
);

/* loaded if login with email and password failed */
export const ngxFireAuthEmailPasswordLoginActionsFailure = createAction(
  '[EmailPasswordLoginAction] ngxFireAuth EmailPasswordLoginActions Failure',
  props<{ error: IAuthError }>()
);
