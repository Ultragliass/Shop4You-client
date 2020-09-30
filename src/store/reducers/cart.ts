import { ICartItem } from '../../models/cartItem';
import { createReducer, on } from '@ngrx/store';
import {
  completeAddItem,
  completeOrder,
  getCart,
  startRemoveItem,
} from '../actions/cart';
import { logout } from '../actions/user';

export interface ICartState {
  cartItems: ICartItem[];
  currentOrderId: string;
}

const initialState: ICartState = {
  cartItems: [],
  currentOrderId: null,
};

export const cartReducer = createReducer(
  initialState,
  on(getCart, (state, { cartItems }) => {
    return {
      ...state,
      cartItems,
    };
  }),
  on(completeAddItem, (state, { cartItem }) => {
    const cartItems = state.cartItems.slice();

    cartItems.push(cartItem);

    return {
      ...state,
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
      ...state,
      cartItems,
    };
  }),
  on(completeOrder, (state, { orderId }) => {
    return {
      cartItems: [],
      currentOrderId: orderId,
    };
  }),
  on(logout, (state) => {
    return initialState;
  })
);
