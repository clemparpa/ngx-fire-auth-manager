import { IdTokenResult, ParsedToken, User } from '@angular/fire/auth';
import { IClaims, IUser } from '../interfaces/auth.interface';

export class FrthUser implements IUser {
  public displayName?: string;
  public email?: string;
  public emailVerified?: boolean;
  public phoneNumber?: string;
  public photoURL?: string;
  public providerId: string;
  public uid: string;
  public claims?: IClaims;

  constructor(user: User, idTokenResult?: IdTokenResult) {
    this.providerId = user.providerId;
    this.uid = user.uid;
    if (user.displayName) this.displayName = user.displayName;
    if (user.email) this.email = user.email;
    if (user.emailVerified) this.emailVerified = user.emailVerified;
    if (user.phoneNumber) this.phoneNumber = user.phoneNumber;
    if (user.photoURL) this.photoURL = user.photoURL;
    if (idTokenResult) this.claims = {...idTokenResult.claims} as IClaims;
  }

  public getIUser(): IUser {
    const respObj: IUser = {
      providerId: this.providerId,
      uid: this.uid,
    };
    if (this.displayName) respObj.displayName = this.displayName;
    if (this.email) respObj.email = this.email;
    if (this.emailVerified) respObj.emailVerified = this.emailVerified;
    if (this.phoneNumber) respObj.phoneNumber = this.phoneNumber;
    if (this.photoURL) respObj.photoURL = this.photoURL;
    if (this.claims) respObj.claims = this.claims;
    return respObj;
  }
}
