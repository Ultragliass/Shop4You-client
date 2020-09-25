import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { StoreService } from '../../app/store.service';
import { fetchStore, receiveStore } from '../actions/store';
@Injectable()
export class StoreEffects {
  constructor(private actions$: Actions, private storeService: StoreService) {}

  fetchStore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchStore),
      mergeMap(() =>
        this.storeService.getStore().pipe(
          map((store) => {
            return receiveStore({ store });
          }),
          catchError((error: Error) => {
            return of({ type: 'error', error: error.message });
          })
        )
      )
    )
  );
}
