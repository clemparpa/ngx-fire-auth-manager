import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { FrthManagerState } from '../interfaces/FrthState.interface';
import * as auth from '../store/actions/auth-action/auth-action.actions';
import * as emailLogin from '../store/actions/email-password-login-action/email-password-login-action.actions';
import * as googleLoginOrSignUp from '../store/actions/google-redirect-login-or-signup-action/google-redirect-login-or-signup-action.actions';
import * as emailSignUp from '../store/actions/email-password-sign-up-action/email-password-sign-up-action.actions';
import * as logout from '../store/actions/logout-action/logout-action.actions';
import * as passwordReset from '../store/actions/password-reset-action/password-reset-action.actions';
import * as clearError from '../store/actions/clear-error/clear-error-action.actions';
import {
  UserSelector,
  ErrorSelector,
  LoadingSelector,
  AuthStateSelector,
} from '../store/selectors/auth.selector';
import { IAuthError, IAuthState, IUser } from '../interfaces/auth.interface';
import { Observable } from 'rxjs';

@Injectable()
export class NgxFireAuthManagerService {
  constructor(private store: Store<FrthManagerState>) {}

  /*
   * method to call on click on login email&password  button
   */
  public loginWithEmailAndPassword(email: string, password: string): void {
    this.store.dispatch(
      emailLogin.ngxFireAuthEmailPasswordLoginActions({ email, password })
    );
  }

  /**
   * method to call on click on google login button
   */
  public loginOrSignInWithGoogle(): void {
    this.store.dispatch(
      googleLoginOrSignUp.ngxFireAuthGoogleRedirectLoginOrSignUpActions()
    );
  }

  /** method to call on click on sign up email&password  button */
  public signUpWithEmailAndPassword(email: string, password: string): void {
    this.store.dispatch(
      emailSignUp.ngxFireAuthEmailPasswordSignUpActions({ email, password })
    );
  }

  /** method to call on click on resetPassword button */
  public sendPasswordResetEmail(email: string): void {
    this.store.dispatch(
      passwordReset.ngxFireAuthPasswordResetActions({ email })
    );
  }

  /** method to call in ngOnInit if you called loginOrSignInWithGoogle() method
   * @depreacted
   * now this method is useless
   * because using googleSignup will reload page and
   * trigger 'authenticate' method automatically*/
  public authenticate(): void {
    this.store.dispatch(auth.ngxFireAuthAuthActions());
  }

  /** method to call on click on logout button */
  public logout(): void {
    return this.store.dispatch(logout.ngxFireAuthLogoutActions());
  }

  /** method to call to clear the authError */
  public clearAuthError(): void {
    return this.store.dispatch(clearError.ngxFireAuthClearErrorActions());
  }

  /** getter for the whole AuthState (user, error, loading)
   * @see IAuthState */
  public getAuth(): Observable<IAuthState> {
    return this.store.select(AuthStateSelector);
  }

  /** getter for the user (possibly null)
   * @see IUser */
  public getUser(): Observable<IUser | null> {
    return this.store.select(UserSelector);
  }

  /** getter for the errors (possibly null)
   * @see IAuthError */
  public getAuthError(): Observable<IAuthError | null> {
    return this.store.select(ErrorSelector);
  }

  /**  getter for the loading*/
  public getLoading(): Observable<boolean> {
    return this.store.select(LoadingSelector);
  }
}
