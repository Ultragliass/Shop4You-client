import { createAction, props } from '@ngrx/store';
import {IStore} from '../../models/store';

export const fetchStore = createAction('GET_STORE_PENDING');
export const receiveStore = createAction('GET_TODOS_SUCCESS', props<{store: IStore}>());