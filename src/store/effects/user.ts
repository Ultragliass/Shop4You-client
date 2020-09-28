import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { UserService } from '../../app/user.service';
import {
  completeAuthentication,
  completeCheck,
  completeLogin,
  showError,
  startAuthentication,
  startCheck,
  startLogin,
  startRegister,
} from '../actions/user';
import { Router } from '@angular/router';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router: Router
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(startLogin),
      mergeMap(({ password, email }) =>
        this.userService.login(email, password).pipe(
          map(({ token, userData, currentCartDate, lastOrderDate }) => {
            return completeLogin({
              token,
              userData,
              currentCartDate,
              lastOrderDate,
            });
          }),
          catchError(({ error }) => {
            return of(showError({ error: error.error }));
          })
        )
      )
    )
  );

  check$ = createEffect(() =>
    this.actions$.pipe(
      ofType(startCheck),
      mergeMap(({ id, email, password }) =>
        this.userService.checkDetails(id, email, password).pipe(
          map(({ success, error }) => {
            return completeCheck({
              success,
              error,
            });
          }),
          catchError(({ error }) => {
            return of(showError({ error: error.error }));
          })
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(startRegister),
      mergeMap(({ id, email, password, city, street, name, lastname }) =>
        this.userService
          .register(id, email, password, city, street, name, lastname)
          .pipe(
            map(({ token, userData }) => {
              return completeLogin({
                token,
                userData,
                currentCartDate: null,
                lastOrderDate: null,
              });
            }),
            catchError(({error}) => {
              return of(showError({ error: error.error }));
            })
          )
      )
    )
  );

  authenticate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(startAuthentication),
      mergeMap(() =>
        this.userService.authenticate().pipe(
          map(({ userData, currentCartDate, lastOrderDate }) => {
            return completeAuthentication({
              userData,
              currentCartDate,
              lastOrderDate,
            });
          }),
          catchError(() => {
            localStorage.removeItem('token');
            return of(null);
          })
        )
      )
    )
  );
}
