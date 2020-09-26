import { createAction, props } from '@ngrx/store';
import { IUser } from '../../models/user';

export const startLogin = createAction(
  'LOGIN_PENDING',
  props<{ email: string; password: string }>()
);

export const completeLogin = createAction(
  'LOGIN_SUCCESS',
  props<{ token: string; userData: IUser }>()
);
