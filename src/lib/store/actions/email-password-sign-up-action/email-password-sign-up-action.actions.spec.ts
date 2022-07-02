import { User } from '@angular/fire/auth';
import { IAuthError } from '../../../interfaces/auth.interface';
import { IEmailPassword } from '../../../interfaces/email-password-login.interfaces';
import * as fromEmailPasswordSignUpAction from './email-password-sign-up-action.actions';

describe('loadEmailPasswordSignUpActions', () => {
  it('should return an ngxFireAuthEmailPasswordSignUpActions', () => {
    const creds: IEmailPassword = {
      email: 'testmail@mail.com',
      password: 'testPassword',
    };
    const action =
      fromEmailPasswordSignUpAction.ngxFireAuthEmailPasswordSignUpActions(
        creds
      );
    expect(action.type).toBe(
      '[EmailPasswordSignUpAction] ngxFireAuth EmailPasswordSignUpActions'
    );
    expect(action.email).toBe(creds.email);
    expect(action.password).toBe(creds.password);
  });

  it('should return an ngxFireAuthEmailPasswordSignUpActionsSuccess', () => {
    const action =
      fromEmailPasswordSignUpAction.ngxFireAuthEmailPasswordSignUpActionsSuccess();
    expect(action.type).toBe(
      '[EmailPasswordSignUpAction] ngxFireAuth EmailPasswordSignUpActions Success'
    );
  });

  it('should return an ngxFireAuthEmailPasswordSignUpActionsFailure', () => {
    const error: IAuthError = { code: '123', message: 'message' };
    const action =
      fromEmailPasswordSignUpAction.ngxFireAuthEmailPasswordSignUpActionsFailure(
        {
          error,
        }
      );
    expect(action.type).toBe(
      '[EmailPasswordSignUpAction] ngxFireAuth EmailPasswordSignUpActions Failure'
    );
    expect(action.error).toEqual(error);
  });
});
