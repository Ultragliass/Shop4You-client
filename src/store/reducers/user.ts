import { Router } from '@angular/router';
import { createReducer, on } from '@ngrx/store';
import { IUser } from '../../models/user';
import {
  completeAuthentication,
  completeCheck,
  completeCreateCart,
  completeLogin,
  dismissError,
  logout,
  showError,
  startCreateCart,
} from '../actions/user';

export interface IUserState {
  isLoading: boolean;
  isLoggedIn: boolean;
  userData: IUser | null;
  currentCartDate: Date | null;
  lastOrderDate: Date | null;
  step1Valid: boolean;
  error: string | null;
}

const initialState: IUserState = {
  isLoading: false,
  isLoggedIn: false,
  userData: null,
  currentCartDate: null,
  lastOrderDate: null,
  step1Valid: false,
  error: null,
};

export const userReducer = createReducer(
  initialState,
  on(
    completeLogin,
    (state, { token, userData, currentCartDate, lastOrderDate }) => {
      localStorage.setItem('token', token);

      return {
        ...state,
        isLoggedIn: true,
        userData,
        currentCartDate: currentCartDate || null,
        lastOrderDate: lastOrderDate || null,
        error: null,
      };
    }
  ),
  on(completeCheck, (state, { success }) => {
    return {
      ...state,
      step1Valid: success,
      error: null,
    };
  }),
  on(
    completeAuthentication,
    (state, { userData, currentCartDate, lastOrderDate }) => {
      return {
        ...state,
        isLoggedIn: true,
        userData,
        currentCartDate: currentCartDate || null,
        lastOrderDate: lastOrderDate || null,
        error: null,
      };
    }
  ),
  on(showError, (state, { error }) => {
    console.log(error);
    return {
      ...state,
      error,
    };
  }),
  on(dismissError, (state) => {
    return {
      ...state,
      error: null,
    };
  }),
  on(logout, () => {
    localStorage.removeItem('token');

    return initialState;
  }),
  on(startCreateCart, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(completeCreateCart, (state, { cartId }) => {
    const { userData } = state;
    return {
      ...state,
      isLoading: false,
      userData: {
        ...userData,
        currentCartId: cartId,
      },
    };
  })
);
