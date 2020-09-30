import { ICartItem } from '../../models/cartItem';
import { createReducer, on } from '@ngrx/store';
import { completeAddItem, getCart, startRemoveItem } from '../actions/cart';

export interface ICartState {
  cartItems: ICartItem[];
}

const initialState: ICartState = {
  cartItems: [],
};

export const cartReducer = createReducer(
  initialState,
  on(getCart, (state, { cartItems }) => {
    return {
      cartItems,
    };
  }),
  on(completeAddItem, (state, { cartItem }) => {
    const cartItems = state.cartItems.slice();

    cartItems.push(cartItem);

    return {
      cartItems,
    };
  }),
  on(startRemoveItem, (state, { cartItemId }) => {
    const cartItems = state.cartItems.slice();

    const index = cartItems.findIndex(
      (cartItem) => cartItem._id === cartItemId
    );

    cartItems.splice(index, 1);

    return {
      cartItems,
    };
  }),
);
