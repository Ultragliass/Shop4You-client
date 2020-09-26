import { createReducer, on } from '@ngrx/store';
import { IUser } from '../../models/user';
import { completeLogin } from '../actions/user';

export interface IUserState {
  isLoggedIn: boolean;
  userData: IUser | null;
}

const initialState: IUserState = {
  isLoggedIn: false,
  userData: null,
};

export const userReducer = createReducer(
  initialState,
  on(completeLogin, (state, { token, userData }) => {
    localStorage.setItem('token', token);

    return {
      isLoggedIn: true,
      userData,
    };
  })
);
