import { createReducer, on } from '@ngrx/store';
import { IUser } from '../../models/user';
import {
  completeAuthentication,
  completeCheck,
  completeLogin,
  dismissError,
  showError,
} from '../actions/user';

export interface IUserState {
  isLoggedIn: boolean;
  userData: IUser | null;
  currentCartDate: Date | null;
  lastOrderDate: Date | null;
  step1Valid: boolean;
  error: string | null;
}

const initialState: IUserState = {
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
  })
);
