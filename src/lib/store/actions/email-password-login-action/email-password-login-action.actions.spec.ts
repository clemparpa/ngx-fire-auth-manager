import { IAuthError } from '../../../interfaces/auth.interface';
import { IEmailPassword } from '../../../interfaces/email-password-login.interfaces';
import * as fromEmailPasswordLoginAction from './email-password-login-action.actions';

describe('loadEmailPasswordLoginActions', () => {
  it('should return ngxFireAuthEmailPasswordLoginActions', () => {
    const creds: IEmailPassword = {
      email: 'testMail@mail.com',
      password: 'testPassword',
    };
    const action =
      fromEmailPasswordLoginAction.ngxFireAuthEmailPasswordLoginActions(creds);
    expect(action.type).toBe(
      '[EmailPasswordLoginAction] ngxFireAuth EmailPasswordLoginActions'
    );
    expect(action.email).toBe(creds.email);
    expect(action.password).toBe(creds.password);
  });

  it('should return ngxFireAuthEmailPasswordLoginActionsSuccess', () => {
    expect(
      fromEmailPasswordLoginAction.ngxFireAuthEmailPasswordLoginActionsSuccess()
        .type
    ).toBe(
      '[EmailPasswordLoginAction] ngxFireAuth EmailPasswordLoginActions Success'
    );
  });

  it('should return ngxFireAuthEmailPasswordLoginActionsFailure', () => {
    const error: IAuthError = { code: '123', message: 'message' };
    const action =
      fromEmailPasswordLoginAction.ngxFireAuthEmailPasswordLoginActionsFailure({
        error,
      });
    expect(action.type).toBe(
      '[EmailPasswordLoginAction] ngxFireAuth EmailPasswordLoginActions Failure'
    );
    expect(action.error).toEqual(error);
  });
});
