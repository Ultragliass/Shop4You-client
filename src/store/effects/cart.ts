import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { CartService } from '../../app/cart.service';
import { completeAddItem, startAddItem } from '../actions/cart';

@Injectable()
export class CartEffects {
  constructor(private actions$: Actions, private cartService: CartService) {}

  addItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(startAddItem),
      mergeMap(({ itemId, amount, cartId }) =>
        this.cartService.addItem(itemId, amount, cartId).pipe(
          map(({ cartItem }) => {
            return completeAddItem({ cartItem });
          }),
          catchError((error) => {
            return of(null);
          })
        )
      )
    )
  );
}
