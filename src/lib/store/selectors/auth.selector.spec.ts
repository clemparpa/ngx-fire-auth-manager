import {
  AuthStateSelector,
  ErrorSelector,
  FrthManagerselector,
  LoadingSelector,
  UserSelector,
} from '../selectors/auth.selector';
import { FrthManagerState } from '../../interfaces/FrthState.interface';

describe('Selectors', () => {
  const initialState: FrthManagerState = {
    auth: {
      user: {
        providerId: 'google.com',
        uid: '123456789',
        displayName: 'John Doe',
        email: 'testmail',
        photoURL: 'https://test.com/test.jpg',
        emailVerified: true,
        phoneNumber: '+123456789',
      },
      error: {
        code: 'auth/invalid-email',
        message: 'Invalid email',
      },
      loading: false,
    },
  };

  it('should select the auth state', () => {
    const result = AuthStateSelector.projector(initialState);
    expect(result).toEqual(initialState.auth);
  });

  it('should select the user state', () => {
    const result = UserSelector.projector(initialState.auth);
    expect(result).toEqual(initialState.auth.user);
  });

  it('should select the error state', () => {
    const result = ErrorSelector.projector(initialState.auth);
    expect(result).toEqual(initialState.auth.error);
  });

  it('should select the loading state', () => {
    const result = LoadingSelector.projector(initialState.auth);
    expect(result).toEqual(initialState.auth.loading);
  });
});
