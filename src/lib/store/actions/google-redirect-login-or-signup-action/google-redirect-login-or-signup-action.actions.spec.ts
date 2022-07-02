import * as fromGoogleRedirectLoginAction from './google-redirect-login-or-signup-action.actions';

describe('loadGoogleRedirectLoginActions', () => {
  it('should return an ngxFireAuthGoogleRedirectLoginOrSignUpActions', () => {
    expect(
      fromGoogleRedirectLoginAction.ngxFireAuthGoogleRedirectLoginOrSignUpActions()
        .type
    ).toBe(
      '[GoogleRedirectLoginAction] ngxFireAuth GoogleRedirectLoginActions'
    );
  });

  it('should return an action ngxFireAuthGoogleRedirectLoginOrSignUpActionsRedirectSuccess', () => {
    expect(
      fromGoogleRedirectLoginAction.ngxFireAuthGoogleRedirectLoginOrSignUpActionsRedirectSuccess()
        .type
    ).toBe(
      '[GoogleRedirectLoginAction] ngxFireAuth GoogleRedirectLoginActionsRedirect Success'
    );
  });
});
