import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, UrlTree } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { IUser } from '../interfaces/auth.interface';
import { NgxFireAuthManagerService } from '../services/ngx-fire-auth.service';

import { AuthGuard } from './auth-guard.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let ngxFireSpy: jasmine.SpyObj<NgxFireAuthManagerService>;

  beforeEach(() => {
    let ngxFireAuthManagerSpyService = jasmine.createSpyObj(
      'NgxFireAuthManagerService',
      ['getUser']
    );

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthGuard,
        {
          provide: NgxFireAuthManagerService,
          useValue: ngxFireAuthManagerSpyService,
        },
      ],
    });
    guard = TestBed.inject(AuthGuard);
    ngxFireSpy = TestBed.inject(
      NgxFireAuthManagerService
    ) as jasmine.SpyObj<NgxFireAuthManagerService>;
  });

  it('should not allow access and return an urlTree', (done) => {
    ngxFireSpy.getUser.and.returnValue(of(null));
    guard
      .canActivate({
        data: { redirectTo: ['/urlTest'] },
      } as unknown as ActivatedRouteSnapshot)
      .subscribe((resp) => {
        expect(resp).toBeInstanceOf(UrlTree);
      });
    done();
  });

  it('should not allow access and return false (no redirecting url specified)', (done) => {
    ngxFireSpy.getUser.and.returnValue(of(null));
    guard
      .canActivate({ data: {} } as ActivatedRouteSnapshot)
      .subscribe((resp) => {
        expect(resp).toBeFalse();
      });
    done();
  });

  it('should allow access and return true', (done) => {
    ngxFireSpy.getUser.and.returnValue(of({} as IUser));
    guard
      .canActivate({ data: {} } as ActivatedRouteSnapshot)
      .subscribe((resp) => {
        expect(resp).toBeTrue();
      });
    done();
  });
});
