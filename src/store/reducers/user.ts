import { createReducer, on } from '@ngrx/store';
import { IUser } from '../../models/user';
import { completeLogin } from '../actions/user';

export interface IUserState {
  isLoggedIn: boolean;
  userData: IUser | null;
  currentCartDate: Date | null;
  lastOrderDate: Date | null;
}

const initialState: IUserState = {
  isLoggedIn: false,
  userData: null,
  currentCartDate: null,
  lastOrderDate: null,
};

export const userReducer = createReducer(
  initialState,
  on(
    completeLogin,
    (state, { token, userData, currentCartDate, lastOrderDate }) => {
      localStorage.setItem('token', token);

      return {
        isLoggedIn: true,
        userData,
        currentCartDate: currentCartDate || null,
        lastOrderDate: lastOrderDate || null,
      };
    }
  )
);
