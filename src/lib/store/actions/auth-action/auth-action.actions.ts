import { createAction, props } from '@ngrx/store';
import { FrthUser } from '../../../classes/userClass.class';
import { IUser } from '../../../interfaces/auth.interface';

export const ngxFireAuthAuthActions = createAction(
  '[AuthAction] ngxFireAuth AuthActions'
);

export const ngxFireAuthAuthActionsSuccess = createAction(
  '[AuthAction] ngxFireAuth AuthActions Success',
  props<{ user: IUser }>()
);

export const ngxFireAuthAuthActionsFailure = createAction(
  '[AuthAction] ngxFireAuth AuthActions Failure'
);
