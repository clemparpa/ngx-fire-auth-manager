export interface IUser {
  displayName?: string;
  email?: string;
  phoneNumber?: string;
  photoURL?: string;
  providerId: string;
  emailVerified?: boolean;
  uid: string;
}

export interface IAuthError {
  code: string;
  message: string;
}

export interface IAuthState {
  user: IUser | null;
  error: IAuthError | null;
  loading: boolean;
}
