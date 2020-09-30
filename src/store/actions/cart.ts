import { createAction, props } from '@ngrx/store';
import { ICartItem } from '../../models/cartItem';

export const fetchCart = createAction(
  'GET_CART_PENDING',
  props<{ cartId: string }>()
);

export const getCart = createAction(
  'GET_CART_COMPLETE',
  props<{ cartItems: ICartItem[] }>()
);

export const startAddItem = createAction(
  'ADD_CART_ITEM_PENDING',
  props<{ itemId: string; amount: number; cartId: string }>()
);

export const completeAddItem = createAction(
  'ADD_CART_ITEM_COMPLETE',
  props<{ cartItem: ICartItem }>()
);

export const startRemoveItem = createAction(
  'REMOVE_CART_ITEM_PENDING',
  props<{ cartId: string; cartItemId: string }>()
);

export const completeRemoveItem = createAction(
  'REMOVE_CART_ITEM_COMPLETE',
  props<{ cartItemId: string }>()
);
