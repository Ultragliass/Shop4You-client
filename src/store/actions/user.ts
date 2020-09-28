import { createAction, props } from '@ngrx/store';
import { IUser } from '../../models/user';

export const startLogin = createAction(
  'LOGIN_PENDING',
  props<{ email: string; password: string }>()
);

export const completeLogin = createAction(
  'LOGIN_SUCCESS',
  props<{
    token: string;
    userData: IUser;
    currentCartDate: Date | null;
    lastOrderDate: Date | null;
  }>()
);

export const startCheck = createAction(
  'CHECK_PENDING',
  props<{ id: string; email: string; password: string }>()
);

export const completeCheck = createAction(
  'CHECK_SUCCESS',
  props<{ success: boolean; error?: string }>()
);

export const startRegister = createAction(
  'REGISTER_PENDING',
  props<{
    id: string;
    email: string;
    password: string;
    city: string;
    street: string;
    name: string;
    lastname: string;
  }>()
);

export const startAuthentication = createAction('AUTHENTICATION_PENDING');

export const completeAuthentication = createAction(
  'AUTHENTICATION_COMPLETE',
  props<{
    userData: IUser;
    currentCartDate: Date | null;
    lastOrderDate: Date | null;
  }>()
);

export const showError = createAction('SHOW_ERROR', props<{ error: string }>());

export const dismissError = createAction('DISMISS_ERROR');
