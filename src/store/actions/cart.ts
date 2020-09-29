import { createAction, props } from '@ngrx/store';
import { ICartItem } from '../../models/cartItem';

export const startAddItem = createAction(
  'ADD_CART_ITEM_PENDING',
  props<{ itemId: string; amount: number; cartId: string }>()
);

export const completeAddItem = createAction(
  'ADD_CART_ITEM_COMPLETE',
  props<{ cartItem: ICartItem }>()
);
