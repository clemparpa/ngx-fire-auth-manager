import { User } from '@angular/fire/auth';
import { IUser } from '../interfaces/auth.interface';

export class FrthUser implements IUser {
  public displayName?: string;
  public email?: string;
  public emailVerified?: boolean;
  public phoneNumber?: string;
  public photoURL?: string;
  public providerId: string;
  public uid: string;

  constructor(user: User) {
    this.providerId = user.providerId;
    this.uid = user.uid;
    if (user.displayName) this.displayName = user.displayName;
    if (user.email) this.email = user.email;
    if (user.emailVerified) this.emailVerified = user.emailVerified;
    if (user.phoneNumber) this.phoneNumber = user.phoneNumber;
    if (user.photoURL) this.photoURL = user.photoURL;
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
    return respObj;
  }
}
