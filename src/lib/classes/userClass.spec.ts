import { User } from '@angular/fire/auth';
import { IUser } from '../interfaces/auth.interface';
import { FrthUser } from './userClass.class';

describe('frthUser Class', () => {
  it('should create an instance with all fields not null', () => {
    const user: User = {
      displayName: 'testDisplayName',
      email: 'testEmail',
      emailVerified: true,
      isAnonymous: false,
      metadata: {},
      phoneNumber: 'testPhoneNumber',
      photoURL: 'testPhotoURL',
      uid: 'testUid',
      providerId: 'testProviderId',
      tenantId: 'testTenantId',
      refreshToken: 'testRefreshToken',
      providerData: [],
    } as unknown as User;

    const frthgetUser: IUser = new FrthUser(user).getIUser();

    const expectedUser: IUser = {
      displayName: 'testDisplayName',
      email: 'testEmail',
      emailVerified: true,
      phoneNumber: 'testPhoneNumber',
      photoURL: 'testPhotoURL',
      providerId: 'testProviderId',
      uid: 'testUid',
    };

    expect(frthgetUser).toEqual(expectedUser);
  });

  it('should create an partial instance of IUser', () => {
    const user: User = {
      displayName: null,
      email: null,
      emailVerified: null,
      isAnonymous: false,
      metadata: {},
      phoneNumber: null,
      photoURL: null,
      uid: 'testUid',
      providerId: 'testProviderId',
      tenantId: 'testTenantId',
      refreshToken: 'testRefreshToken',
      providerData: [],
    } as unknown as User;

    const frthgetUser: IUser = new FrthUser(user).getIUser();

    const expectedUser: IUser = {
      uid: 'testUid',
      providerId: 'testProviderId',
    };

    expect(frthgetUser).toEqual(expectedUser);
  });
});
