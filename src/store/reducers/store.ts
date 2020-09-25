import { createReducer, on } from '@ngrx/store';
import { IStore } from '../../models/store';
import { fetchStore, receiveStore } from '../actions/store';

export interface IStoreState {
  store: IStore | null;
  isLoading: boolean;
}

const initialState: IStoreState = {
  store: null,
  isLoading: false,
};

export const storeReducer = createReducer(
  initialState,
  on(fetchStore, (state) => ({ ...state, isLoading: true })),
  on(receiveStore, (state, { store }) => ({
    ...state,
    isLoading: false,
    store,
  }))
);
