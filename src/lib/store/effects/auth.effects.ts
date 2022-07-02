import { Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, take, tap } from 'rxjs';
import * as authAction from '../actions/auth-action/auth-action.actions';
import * as emailLogin from '../actions/email-password-login-action/email-password-login-action.actions';
import * as googleLoginOrSignUp from '../actions/google-redirect-login-or-signup-action/google-redirect-login-or-signup-action.actions';
import * as emailSignUp from '../actions/email-password-sign-up-action/email-password-sign-up-action.actions';
import * as logout from '../actions/logout-action/logout-action.actions';
import * as passwordReset from '../actions/password-reset-action/password-reset-action.actions';
import { AuthOpsService } from '../../services/auth-ops.service';
import { FrthUser } from '../../classes/userClass.class';
import { Action } from '@ngrx/store';

@Injectable()
export class AuthEffects {
  // implements OnInitEffects {
  constructor(private actions$: Actions, private authOps: AuthOpsService) {}

  ngrxOnInitEffects(): Action {
    return authAction.ngxFireAuthAuthActions();
  }

  /** 
  effect that will be triggered on ngxFireAuthAuthActions
  @returns ngxFireAuthAuthActionsSuccess if a user is connected
  @returns ngxFireAuthAuthActionsFailure if no user is connected
  */
  ngxFrthauth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authAction.ngxFireAuthAuthActions.type),
      exhaustMap(() =>
        this.authOps.getAuthState().pipe(
          take(1),
          map((userResp: User | null) => {
            if (userResp === null) {
              return authAction.ngxFireAuthAuthActionsFailure();
            } else {
              return authAction.ngxFireAuthAuthActionsSuccess({
                user: new FrthUser(userResp).getIUser(),
              });
            }
          })
        )
      )
    )
  );

  /**
   * effect that will be triggered on ngxFireAuthEmailPasswordLoginActions
   * @returns ngxFireAuthEmailPasswordLoginActionsSuccess if signIn is successful
   * @returns ngxFireAuthEmailPasswordLoginActionsFailure if signIn is not successful
   */
  ngxFrthemailLogin$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(emailLogin.ngxFireAuthEmailPasswordLoginActions.type),
        exhaustMap(({ email, password }) =>
          this.authOps.signInWithEmailAndPassword(email, password).pipe(
            map((r) =>
              emailLogin.ngxFireAuthEmailPasswordLoginActionsSuccess()
            ),
            catchError((err: Error) =>
              of(
                emailLogin.ngxFireAuthEmailPasswordLoginActionsFailure({
                  error: { message: err.message, code: err.name },
                })
              )
            )
          )
        )
      ),
    { useEffectsErrorHandler: false }
  );

  /**
   * effect that will be triggered on ngxFireAuthEmailPasswordLoginActionsSuccess
   * @returns ngxFireAuthAuthActions to auth the user
   */
  ngxFrthemailLoginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(emailLogin.ngxFireAuthEmailPasswordLoginActionsSuccess.type),
      map(() => authAction.ngxFireAuthAuthActions())
    )
  );

  /**
   * effect that will be triggered on ngxFireAuthEmailPasswordSignUpActions
   * @returns ngxFireAuthEmailPasswordSignUpActionsSuccess if signUp is successful
   * @returns ngxFireAuthEmailPasswordSignUpActionsFailure if signUp is not successful
   */
  ngxFrthemailSignUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(emailSignUp.ngxFireAuthEmailPasswordSignUpActions.type),
      exhaustMap(({ email, password }) =>
        this.authOps.createUserWithEmailAndPassword(email, password).pipe(
          map(() => emailSignUp.ngxFireAuthEmailPasswordSignUpActionsSuccess()),
          catchError((err: Error) =>
            of(
              emailSignUp.ngxFireAuthEmailPasswordSignUpActionsFailure({
                error: { message: err.message, code: err.name },
              })
            )
          )
        )
      )
    )
  );

  /**
   * effect that will be triggered on ngxFireAuthEmailPasswordSignUpActionsSuccess
   * send a verification email to the user
   * @returns ngxFireAuthAuthActions to auth the user
   */
  ngxFrthemailSignUpSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(emailSignUp.ngxFireAuthEmailPasswordSignUpActionsSuccess.type),
      tap(() => this.authOps.sendEmailVerification()),
      map(() => authAction.ngxFireAuthAuthActions())
    )
  );

  /**
   * effect that will be triggered on ngxFireAuthGoogleRedirectLoginOrSignUpActions
   * @returns ngxFireAuthGoogleRedirectLoginOrSignUpActionsRedirectSuccess if the redirection is successful
   * @returns ngxFireAuthGoogleRedirectLoginOrSignUpActionsRedirectFailure if the redirection is not successful
   */
  ngxFrthgoogleLoginOrSignUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        googleLoginOrSignUp.ngxFireAuthGoogleRedirectLoginOrSignUpActions.type
      ),
      tap(() => this.authOps.signInWithGoogleRedirect()),
      map(() =>
        googleLoginOrSignUp.ngxFireAuthGoogleRedirectLoginOrSignUpActionsRedirectSuccess()
      )
    )
  );

  /**
   * effect that will be triggered on ngxFireAuthLogoutActions
   * sign out the current user
   * @returns ngxFireAuthLogoutActionsSuccess if the logout is successful
   * @returns ngxFireAuthLogoutActionsFailure if the logout is not successful
   */
  ngxFrthlogout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout.ngxFireAuthLogoutActions.type),
      exhaustMap(() =>
        this.authOps.signOut().pipe(
          map(() => logout.ngxFireAuthLogoutActionsSuccess()),
          catchError(() => of(logout.ngxFireAuthLogoutActionsFailure()))
        )
      )
    )
  );

  /**
   * effect that will be triggered on ngxFireAuthPasswordResetActions
   * send an email to reset the password
   * @returns ngxFireAuthPasswordResetActionsSuccess if the send is successful
   * @returns ngxFireAuthPasswordResetActionsFailure if the send is not successful
   */
  ngxFrthpasswordReset$ = createEffect(() =>
    this.actions$.pipe(
      ofType(passwordReset.ngxFireAuthPasswordResetActions.type),
      exhaustMap(({ email }) =>
        this.authOps.sendPasswordResetEmail(email).pipe(
          map(() => passwordReset.ngxFireAuthPasswordResetActionsSuccess()),
          catchError((err: Error) =>
            of(
              passwordReset.ngxFireAuthPasswordResetActionsFailure({
                error: { message: err.message, code: err.name },
              })
            )
          )
        )
      )
    )
  );
}
