import { createAction, props } from '@ngrx/store';
import { IAuthError } from '../../../interfaces/auth.interface';

export const ngxFireAuthLogoutActions = createAction(
  '[LogoutAction] ngxFireAuth LogoutActions'
);

export const ngxFireAuthLogoutActionsSuccess = createAction(
  '[LogoutAction] ngxFireAuth LogoutActions Success'
);

export const ngxFireAuthLogoutActionsFailure = createAction(
  '[LogoutAction] ngxFireAuth LogoutActions Failure'
);
