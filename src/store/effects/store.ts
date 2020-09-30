import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  mergeMap,
  switchMap,
} from 'rxjs/operators';
import { StoreService } from '../../app/store.service';
import {
  fetchItemsByCategory,
  fetchStore,
  receiveItemsByCategory,
  receiveSearchedItems,
  receiveStore,
  searchItems,
} from '../actions/store';
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

  fetchItemsByCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchItemsByCategory),
      mergeMap(({ categoryId }) =>
        this.storeService.getItemsByCategory(categoryId).pipe(
          map(({ selectedItems, items }) => {
            return receiveItemsByCategory({ selectedItems, items });
          }),
          catchError((error) => {
            return of({ type: 'error' });
          })
        )
      )
    )
  );

  searchItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(searchItems),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(({ term }) =>
        this.storeService.searchItems(term).pipe(
          map(({ selectedItems, items }) => {
            return receiveSearchedItems({ selectedItems, items });
          }),
          catchError((error) => {
            return of({ type: 'error' });
          })
        )
      )
    )
  );
}
