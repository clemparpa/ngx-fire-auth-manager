import { IAuthError } from '../../../interfaces/auth.interface';
import * as fromLogoutAction from './logout-action.actions';

describe('loadLogoutActions', () => {
  it('should return an ngxFireAuthLogoutActions', () => {
    expect(fromLogoutAction.ngxFireAuthLogoutActions().type).toBe(
      '[LogoutAction] ngxFireAuth LogoutActions'
    );
  });

  it('should return an ngxFireAuthLogoutActionsSuccess', () => {
    expect(fromLogoutAction.ngxFireAuthLogoutActionsSuccess().type).toBe(
      '[LogoutAction] ngxFireAuth LogoutActions Success'
    );
  });

  it('should return an ngxFireAuthLogoutActionsFailure', () => {
    const action = fromLogoutAction.ngxFireAuthLogoutActionsFailure();
    expect(action.type).toBe(
      '[LogoutAction] ngxFireAuth LogoutActions Failure'
    );
  });
});
