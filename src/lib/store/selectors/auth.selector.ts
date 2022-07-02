import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAuthState } from '../../interfaces/auth.interface';
import { FrthManagerState } from '../../interfaces/FrthState.interface';

export const NGX_FIRE_AUTH_MANAGER_FEATURE_KEY = 'FrthManager';

export const FrthManagerselector = createFeatureSelector<FrthManagerState>(
  NGX_FIRE_AUTH_MANAGER_FEATURE_KEY
);

export const AuthStateSelector = createSelector(
  FrthManagerselector,
  (state: FrthManagerState) => state.auth
);

export const UserSelector = createSelector(
  AuthStateSelector,
  (state: IAuthState) => state.user
);

export const LoadingSelector = createSelector(
  AuthStateSelector,
  (state: IAuthState) => state.loading
);

export const ErrorSelector = createSelector(
  AuthStateSelector,
  (state: IAuthState) => state.error
);
