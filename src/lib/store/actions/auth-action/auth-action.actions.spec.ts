import { IAuthError, IUser } from '../../../interfaces/auth.interface';
import * as fromAuthAction from './auth-action.actions';

describe('loadAuthActions', () => {
  it('should return ngxFireAuthAuthActions', () => {
    expect(fromAuthAction.ngxFireAuthAuthActions().type).toBe(
      '[AuthAction] ngxFireAuth AuthActions'
    );
  });

  it('should return ngxFireAuthAuthActionsSuccess', () => {
    const user: IUser = {
      uid: '123',
      email: 'testMail@dotmail.com',
      displayName: 'testName',
      photoURL: 'testPhotoURL',
      emailVerified: true,
      phoneNumber: '0123456789',
      providerId: 'testProviderId',
    };
    const action = fromAuthAction.ngxFireAuthAuthActionsSuccess({ user });
    expect(action.type).toBe('[AuthAction] ngxFireAuth AuthActions Success');
    expect(action.user).toEqual(user);
  });

  it('should return ngxFireAuthAuthActionsFailure', () => {
    const action = fromAuthAction.ngxFireAuthAuthActionsFailure();
    expect(action.type).toBe('[AuthAction] ngxFireAuth AuthActions Failure');
  });
});
