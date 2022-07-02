import { User } from '@angular/fire/auth';
import { createAction, props } from '@ngrx/store';
import { IAuthError } from '../../../interfaces/auth.interface';

import { IEmailPassword } from '../../../interfaces/email-password-login.interfaces';

export const ngxFireAuthEmailPasswordSignUpActions = createAction(
  '[EmailPasswordSignUpAction] ngxFireAuth EmailPasswordSignUpActions',
  props<IEmailPassword>()
);

export const ngxFireAuthEmailPasswordSignUpActionsSuccess = createAction(
  '[EmailPasswordSignUpAction] ngxFireAuth EmailPasswordSignUpActions Success'
);

export const ngxFireAuthEmailPasswordSignUpActionsFailure = createAction(
  '[EmailPasswordSignUpAction] ngxFireAuth EmailPasswordSignUpActions Failure',
  props<{ error: IAuthError }>()
);
