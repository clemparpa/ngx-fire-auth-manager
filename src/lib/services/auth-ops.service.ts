import { Injectable } from '@angular/core';

import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithRedirect,
  User,
  UserCredential,
} from '@angular/fire/auth';
import { from, Observable } from 'rxjs';

@Injectable()
export class AuthOpsService {
  constructor(private auth: Auth) {}

  /**
   * Wrapper for @angular/fire authState
   */
  public getAuthState(): Observable<User | null> {
    return authState(this.auth);
  }

  /**
   *
   * @param email
   * @param password
   * Wrapper for @angular/fire signInWithEmailAndPassword
   */
  public signInWithEmailAndPassword(
    email: string,
    password: string
  ): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  /**
   *
   * @param email
   * @param password
   * wrapper for @angular/fire createUserWithEmailAndPassword
   */
  public createUserWithEmailAndPassword(
    email: string,
    password: string
  ): Observable<UserCredential> {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  /**
   * wrapper for @angular/fire signInWithRedirect with google provider
   */
  public signInWithGoogleRedirect(): Observable<never> {
    return from(signInWithRedirect(this.auth, new GoogleAuthProvider()));
  }

  /**
   * wrapper for @angular/fire auth.signOut
   */
  public signOut(): Observable<void> {
    return from(this.auth.signOut());
  }

  /**
   * @param email
   * wrapper for @angular/fire sendPasswordResetEmail
   */
  public sendPasswordResetEmail(email: string): Observable<void> {
    return from(sendPasswordResetEmail(this.auth, email));
  }

  /**
   *
   * wrapper for @angular/fire sendEmailVerification
   */
  public sendEmailVerification(): Promise<void> {
    return sendEmailVerification(this.auth.currentUser!);
  }
}
