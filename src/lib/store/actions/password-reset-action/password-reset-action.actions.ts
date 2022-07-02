import { createAction, props } from '@ngrx/store';
import { IAuthError } from '../../../interfaces/auth.interface';

export const ngxFireAuthPasswordResetActions = createAction(
  '[PasswordResetAction] ngxFireAuth PasswordResetActions',
  props<{ email: string }>()
);

export const ngxFireAuthPasswordResetActionsSuccess = createAction(
  '[PasswordResetAction] ngxFireAuth PasswordResetActions Success'
);

export const ngxFireAuthPasswordResetActionsFailure = createAction(
  '[PasswordResetAction] ngxFireAuth PasswordResetActions Failure',
  props<{ error: IAuthError }>()
);
