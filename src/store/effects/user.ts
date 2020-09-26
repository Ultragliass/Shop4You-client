import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { UserService } from '../../app/user.service';
import { completeLogin, startLogin } from '../actions/user';
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
          map(({ token, userData }) => {
            console.log(token)
            return completeLogin({ token, userData });
          }),
          catchError((error: Error) => {
            return of({ type: 'error' });
          })
        )
      )
    )
  );
}
