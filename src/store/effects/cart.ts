import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { CartService } from '../../app/cart.service';
import {
  completeAddItem,
  completeRemoveItem,
  fetchCart,
  getCart,
  startAddItem,
  startRemoveItem,
} from '../actions/cart';

@Injectable()
export class CartEffects {
  constructor(private actions$: Actions, private cartService: CartService) {}

  getCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchCart),
      switchMap(({ cartId }) =>
        this.cartService.getCart(cartId).pipe(
          map(({ cartItems }) => {
            return getCart({ cartItems });
          }),
          catchError((error) => {
            return of({type: 'error'});
          })
        )
      )
    )
  );

  addItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(startAddItem),
      mergeMap(({ itemId, amount, cartId }) =>
        this.cartService.addItem(itemId, amount, cartId).pipe(
          map(({ cartItem }) => {
            return completeAddItem({ cartItem });
          }),
          catchError((error) => {
            return of({type: 'error'});
          })
        )
      )
    )
  );

  removeItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(startRemoveItem),
      mergeMap(({ cartId, cartItemId }) =>
        this.cartService.removeItem(cartId, cartItemId).pipe(
          map(({ cartItemId }) => {
            return completeRemoveItem({ cartItemId });
          }),
          catchError((error) => {
            console.log(error.error)
            return of({type: 'error'});
          })
        )
      )
    )
  );
}
