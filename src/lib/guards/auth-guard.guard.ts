import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  UrlTree,
} from "@angular/router";
import { map, Observable, take } from "rxjs";
import { NgxFireAuthManagerService } from "../services/ngx-fire-auth.service";

/**
 * Can Activate Guard that check if a user is connected to access the route
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private ngxFireAuthManager: NgxFireAuthManagerService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    const urlToRedirect = route.data["redirectTo"] as Array<string> | undefined;

    return this.ngxFireAuthManager.getUser().pipe(
      take(1),
      map((user) => {
        if (user === null) {
          if (urlToRedirect) {
            return this.router.createUrlTree(urlToRedirect);
          } else {
            return false;
          }
        } else {
          return true;
        }
      })
    );
  }
}
