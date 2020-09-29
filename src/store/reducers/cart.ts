import { ICartItem } from '../../models/cartItem';
import { createReducer, on } from '@ngrx/store';
import { completeAddItem } from '../actions/cart';

export interface ICartState {
  cartItems: ICartItem[];
}

const initialState: ICartState = {
  cartItems: [],
};

export const cartReducer = createReducer(
  initialState,
  on(completeAddItem, (state, { cartItem }) => {
    const cartItems = state.cartItems.slice();

    cartItems.push(cartItem);

    console.log(cartItems);

    return {
      cartItems,
    };
  })
);
