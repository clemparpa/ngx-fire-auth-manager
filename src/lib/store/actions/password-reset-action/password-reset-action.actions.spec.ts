import { IAuthError } from '../../../interfaces/auth.interface';
import * as fromPasswordResetAction from './password-reset-action.actions';

describe('loadPasswordResetActions', () => {
  it('should return an ngxFireAuthPasswordResetActions', () => {
    const email: string = 'emailTest@mail.com';
    const action = fromPasswordResetAction.ngxFireAuthPasswordResetActions({
      email,
    });
    expect(action.type).toBe(
      '[PasswordResetAction] ngxFireAuth PasswordResetActions'
    );
    expect(action.email).toBe(email);
  });

  it('should return an ngxFireAuthPasswordResetActionsSuccess', () => {
    expect(
      fromPasswordResetAction.ngxFireAuthPasswordResetActionsSuccess().type
    ).toBe('[PasswordResetAction] ngxFireAuth PasswordResetActions Success');
  });

  it('should return an ngxFireAuthPasswordResetActionsFailure', () => {
    const error: IAuthError = { code: '123', message: 'message' };
    const action =
      fromPasswordResetAction.ngxFireAuthPasswordResetActionsFailure({
        error,
      });
    expect(action.type).toBe(
      '[PasswordResetAction] ngxFireAuth PasswordResetActions Failure'
    );
    expect(action.error).toEqual(error);
  });
});
