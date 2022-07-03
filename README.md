<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/clemparpa/ngx-fire-auth-manager">
    <img src="logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">NgxFireAuthManager</h3>

  <p align="center">
    NgxFireAuthManager is a library for Angular that manage firebase authentication with Nrgx to let you build your apps
    way faster 
    <br />
    <a href="https://github.com/clemparpa/ngx-fire-auth-manager"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    ·
    <a href="https://github.com/clemparpa/ngx-fire-auth-manager/issues">Report Bug</a>
    ·
    <a href="https://github.com/clemparpa/ngx-fire-auth-manager/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

NgxFireAuthManager is a auth library for Angular that provides methods like signup, signin, logout, etc to manage firebase authentication.
It is a Ngrx Wrapper around @Angular/fire auth module (see @angular/fire v7).
NgxFireAuthManager also provide an optional auto-redirecting system on login and logout.
This package user Ngrx so you have access to a bunch of actions and can use them in your own ngrx effects to implement additional behaviors.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

To use NgxFireAuthManager, your angular projects needs to have the following dependencies:

- @angular: 13.
- rxjs: ~7.5.0.
- @ngrx/effects: ^13.1.0,
- @ngrx/store: ^13.1.0,
- @angular/fire: ^7.3.0,

You can install them with the following commands that configurate automatically your AppModule:

- npm
  ```sh
    npm install rxjs
    ng add @ngrx/store@13.1.0
    ng add @ngrx/effects@13.1.0
    ng add @angular/fire
  ```

or install them and configure AppModule manually with these commands:

- npm
  ```sh
    npm install rxjs
    npm install @ngrx/store@13.1.0
    npm install @ngrx/effects@13.1.0
    npm install @angular/fire
  ```

Then you need to configure AppModule like that:

- app.module.ts

  ```typescript
  import { NgModule } from "@angular/core";
  import { BrowserModule } from "@angular/platform-browser";

  import { AppRoutingModule } from "./app-routing.module";
  import { AppComponent } from "./app.component";
  import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
  import { environment } from "../environments/environment";
  import { provideAuth, getAuth } from "@angular/fire/auth";
  import { StoreModule } from "@ngrx/store";
  import { EffectsModule } from "@ngrx/effects";

  @NgModule({
    declarations: [AppComponent],
    imports: [
      BrowserModule,
      AppRoutingModule,

      // this line is to initialize firebase app
      provideFirebaseApp(() => initializeApp(environment.firebase)),

      // this line is to initialize firebase auth
      provideAuth(() => getAuth()),

      // this line initialize Ngrx store module
      StoreModule.forRoot({}),

      // thisl line initialize Ngrx store effects
      EffectsModule.forRoot([]),
    ],
    providers: [],
    bootstrap: [AppComponent],
  })
  export class AppModule {}
  ```

### Installation

you can clone the repository here or use npm to install ngx-fire-auth-manager

1. Clone the repo
   ```sh
   git clone https://github.com/clemparpa/ngx-fire-auth-manager.git
   ```

then you need to build the repo using "ng-test"

OR

2. Install NPM packages
   ```sh
      npm install ngx-fire-auth-manager
   ```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

Add this line code to your app.module.ts imports

- app.module.ts

  ```typescript
      import { NgxFireAuthManagerModule } from 'ngx-fire-auth-manager';



      /*
        imports of AppModule
      */
      imports: [
        BrowserModule,
        AppRoutingModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),

        // add this line to add ngx-fire-auth-manager
        NgxFireAuthManagerModule
    ],

  ```

After you have configured the app.module.ts you can use the ngxFireAuthManagerService in your app.
This service provides a bunch of methods to signIn, signUp, Logout, etc..
You must use NgxFireAuthManagerService like your own services, with dependancy injection.
For example in a loginPageComponent with a loginWithGoogle method:

- login-page-component.ts

  ```typescript
      import { NgxFireAuthManagerService } from 'ngx-fire-auth-manager';

      constructor(private ngxFireAuthManager: NgxFireAuthManagerService) {}

      loginWithGoogle() {
          this.ngxFireAuthManager.loginOrSignUpWithGoogle();
      }
  ```

### NgxFireAuthManagerService

NgxFireAuthManagerService methods:

| method                     | Description                                                               |
| -------------------------- | ------------------------------------------------------------------------- |
| loginWithEmailAndPassword  | login a user with email(string) and password(string)                      |
| loginOrSignUpWithGoogle    | login or create a user with google redirection                            |
| signUpWithEmailAndPassword | create a new user with email(string) and password(string)                 |
| authenticate               | retrieve if a user is already connected                                   |
| logout                     | logout a user                                                             |
| clearAuthError             | clear authError in the store (set to null)                                |
| getAuth                    | get the authState Observable(IAuthState)                                  |
| getUser                    | get the currentUser Observable(IUser or null)                             |
| getAuthError               | get the authError Observable(IAuthError or null)                          |
| IsLoading                  | get the isLoading Observable(boolean) to check if an operation is running |

#### example of use

Use NgxFireAuthManagerService like this:

- to login user with email and password in a component:

  ```typescript
      import { NgxFireAuthManagerService } from 'ngx-fire-auth-manager';

      constructor(private ngxFireAuthManager: NgxFireAuthManagerService) {}

      loginWithEmailAndPassword(email: string, password: string) {
          this.ngxFireAuthManager.loginWithEmailAndPassword(email, password);
      }
  ```

- to login user with google in a component:

```typescript
    import { NgxFireAuthManagerService } from 'ngx-fire-auth-manager';

    constructor(private ngxFireAuthManager: NgxFireAuthManagerService) {}


    loginWithGoogle() {
        this.ngxFireAuthManager.loginOrSignUpWithGoogle();
    }
```

- to signup user with email and password in a component:

  ```typescript
      import { NgxFireAuthManagerService } from 'ngx-fire-auth-manager';

      constructor(private ngxFireAuthManager: NgxFireAuthManagerService) {}

      signUpWithEmailAndPassword(email: string, password: string) {
          this.ngxFireAuthManager.signUpWithEmailAndPassword(email, password);
      }
  ```

An email will be sent to the user to verify his email address (check firebase auth docs).
You can make your own ngrx effect to catch the emailVerificationSentAction action and show a snackbar with a message like
'verify your e-mail'.

- to signup user with google redirection in a component:

  ```typescript
      import { NgxFireAuthManagerService } from 'ngx-fire-auth-manager';

      constructor(private ngxFireAuthManager: NgxFireAuthManagerService) {}


      signUpWithGoogle() {
          this.ngxFireAuthManager.loginOrSignUpWithGoogle();
      }
  ```

- to logout the current User in a component:

  ```typescript
      import { NgxFireAuthManagerService } from 'ngx-fire-auth-manager';

      constructor(private ngxFireAuthManager: NgxFireAuthManagerService) {}

      logout() {
          this.ngxFireAuthManager.logout();
      }
  ```

- to send Password reset e-mail to a user:

  ```typescript
      import { NgxFireAuthManagerService } from 'ngx-fire-auth-manager';

      constructor(private ngxFireAuthManager: NgxFireAuthManagerService) {}

      sendPasswordResetEmail(email: string) {
          this.ngxFireAuthManager.sendPasswordResetEmail(email);
      }
  ```

- to clear authError (for example when an other page is loaded) :

  ```typescript
      import { NgxFireAuthManagerService } from 'ngx-fire-auth-manager';

      constructor(private ngxFireAuthManager: NgxFireAuthManagerService) {
        this.ngxFireAuthManager.clearAuthError();
      }
  ```

An email will be sent to the user with a link to reset his password.
You can make your own ngrx effect to catch the resetUserPasswordSucessAction action or use the enum FrthActionTypesEnum to get the type of this action and show a snackbar with a message like
'check your mailbox'.

- to get the authState Observable in a component:

  ```typescript
      import { NgxFireAuthManagerService, IAuthState } from 'ngx-fire-auth-manager';


      public auth$: Observable<IAuthState>;

      constructor(private ngxFireAuthManager: NgxFireAuthManagerService) {
          this.auth$ = this.ngxFireAuthManager.getAuth();
      }

  ```

- to get the currentUser Observable in a component:

  ```typescript
      import { NgxFireAuthManagerService, IUser } from 'ngx-fire-auth-manager';


      public user$: Observable<IUser | null>;

      constructor(private ngxFireAuthManager: NgxFireAuthManagerService) {
          this.user$ = this.ngxFireAuthManager.getUser();
      }

  ```

- to get the authError Observable in a component:

  ```typescript
      import { NgxFireAuthManagerService, IAuthError } from 'ngx-fire-auth-manager';


      public error$: Observable<IAuthError | null>;

      constructor(private ngxFireAuthManager: NgxFireAuthManagerService) {
          this.error$ = this.ngxFireAuthManager.getAuthError();
      }

  ```

- to get the isLoading Observable in a component:

  ```typescript
      import { NgxFireAuthManagerService } from 'ngx-fire-auth-manager';


      public loading$: Observable<boolean>;

      constructor(private ngxFireAuthManager: NgxFireAuthManagerService) {
          this.loading$ = this.ngxFireAuthManager.IsLoading();
      }

  ```

### Guard

NgxFireAuthManager can be used with a guard to protect your application.
the auth-guards is a CanActivate Guard that allow user to access to a route only if he is logged in.

#### Example of use

- app-routing.module.ts:

  ```typescript
  import { AuthGuard } from "ngx-fire-auth-manager";

  const routes: Routes = [
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "home", component: HomePageComponent },
    // 'user' path is protected from not logged-in users
    { path: "user", component: UserPageComponent, canActivate: [AuthGuard] },
    { path: "**", redirectTo: "home" },
  ];
  ```

### Interfaces

NgrxFireAuthManagerService comes with interfaces to describe the objects you can get with:

- IAuthState: the authState object

  ```typescript
  interface IAuthState {
    isAuthenticated: boolean;
    user: IUser | null;
    error: IAuthError | null;
  }
  ```

- IUser: the currentUser object

  ```typescript
  interface IUser {
    displayName?: string;
    email?: string;
    phoneNumber?: string;
    photoURL?: string;
    providerId: string;
    uid: string;
  }
  ```

- IAuthError: the authError object
  ```typescript
  interface IAuthError {
    code: string;
    message: string;
  }
  ```

#### Errors

Errors are handled by the authError Observable, with the IAuthError interface.
the error code is the error code from firebase auth, the message is the error message from firebase auth.

### Actions

Check source code store/actions to see all available actions to catch.
We also provide an Enum to get the type of most usefuls actions.

- FrthActionTypesEnum:
  ```typescript
  export enum FrthActionsTypesEnum {
    AuthSuccess = "[AuthAction] ngxFireAuth AuthActions Success",
    EmailPasswordLoginSuccess = "[EmailPasswordLoginAction] ngxFireAuth EmailPasswordLoginActions Success",
    EmailPasswordSignUpSuccess = "[EmailPasswordSignUpAction] ngxFireAuth EmailPasswordSignUpActions Success",
    GoogleRedirectLoginOrSignUpSuccess = "[GoogleRedirectLoginAction] ngxFireAuth GoogleRedirectLoginActionsRedirect Success",
    LogoutSuccess = "[LogoutAction] ngxFireAuth LogoutActions Success",
    PasswordResetSuccess = "[PasswordResetAction] ngxFireAuth PasswordResetActions Success",
  }
  ```

#### Custom Effects

Here an example of a custom effect to catch NgxFireAuthManager actions (using @Angular/Material for the snackbar):
You need to add your custom effects like your own effects in your modules.

- app.module.ts:

  ```typescript
  @NgModule({
    imports: [ EffectsModule.forRoot([AdditionalEffects]),],
    exports: [...],
    providers: [...],
    bootstrap: [AppComponent],
  })
  export class AppModule {}
  ```

  - additionalEffects.effects.ts:

  ```typescript
  import { Injectable } from "@angular/core";
  import { MatSnackBar } from "@angular/material/snack-bar";
  import { Router } from "@angular/router";
  import { Actions, ofType, createEffect } from "@ngrx/effects";
  import { tap } from "rxjs";
  import { FrthActionsTypesEnum } from "../modules/ngx-fire-auth-v2/interfaces/actionTypes.enum";

  @Injectable()
  export class AdditionalEffects {
    constructor(
      private actions$: Actions,
      private router: Router,
      private _snackBar: MatSnackBar
    ) {}

    // navigate to page /user when someone is connected
    onAuthSuccess$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(FrthActionsTypesEnum.AuthSuccess),
          tap(() => {
            this.router.navigate(["/user"]);
          })
        ),
      { dispatch: false }
    );

    // navigate to page '/' when someone is logged out
    onLogoutSuccess$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(FrthActionsTypesEnum.LogoutSuccess),
          tap(() => {
            this.router.navigate(["/"]);
            this._snackBar.open("Logout successful", "", {
              verticalPosition: "top",
              duration: 2000,
            });
          })
        ),
      { dispatch: false }
    );

    // navigate to page '/login' when password is reset
    // then show a snackbar with the message "Password reset successful"
    onPasswordResetSuccess$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(FrthActionsTypesEnum.PasswordResetSuccess),
          tap(() => {
            this.router.navigate(["/login"]);
            this._snackBar.open("Password reset successful", "", {
              verticalPosition: "top",
              duration: 2000,
            });
          })
        ),
      { dispatch: false }
    );

    // show a snackbar with the message "Sign up successful" when a user sign-up
    onSignUpSuccess$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(FrthActionsTypesEnum.EmailPasswordSignUpSuccess),
          tap(() => {
            this._snackBar.open("Sign up successful", "", {});
          })
        ),
      { dispatch: false }
    );
  }
  ```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [x] testing
- [ ] add optional options like send an email on signUp
- [ ] add other signUp providers like Facebook, Apple, etc..
- [ ] refactoring

See the [open issues](https://github.com/clemparpa/ngx-fire-auth-manager/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Clément Parpaillon - clem.parpaillon@gmail.com

Project Link: [https://github.com/clemparpa/ngx-fire-auth-manager](https://github.com/clemparpa/ngx-fire-auth-manager)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/clemparpa/ngx-fire-auth-manager.svg?style=for-the-badge
[contributors-url]: https://github.com/clemparpa/ngx-fire-auth-manager/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/clemparpa/ngx-fire-auth-manager.svg?style=for-the-badge
[forks-url]: https://github.com/clemparpa/ngx-fire-auth-manager/network/members
[stars-shield]: https://img.shields.io/github/stars/clemparpa/ngx-fire-auth-manager.svg?style=for-the-badge
[stars-url]: https://github.com/clemparpa/ngx-fire-auth-manager/stargazers
[issues-shield]: https://img.shields.io/github/issues/clemparpa/ngx-fire-auth-manager.svg?style=for-the-badge
[issues-url]: https://github.com/clemparpa/ngx-fire-auth-manager/issues
[license-shield]: https://img.shields.io/github/license/clemparpa/ngx-fire-auth-manager.svg?style=for-the-badge
[license-url]: https://github.com/clemparpa/ngx-fire-auth-manager/blob/master/LICENSE.txt
[product-screenshot]: images/screenshot.png
