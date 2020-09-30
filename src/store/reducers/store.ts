import { createReducer, on } from '@ngrx/store';
import { IItem, IStore } from '../../models/store';
import {
  fetchItemsByCategory,
  fetchStore,
  receiveItemsByCategory,
  receiveSearchedItems,
  receiveStore,
} from '../actions/store';

export interface IStoreState {
  store: IStore | null;
  isLoading: boolean;
  selectedItems: IItem[];
}

const initialState: IStoreState = {
  store: null,
  isLoading: false,
  selectedItems: [],
};

export const storeReducer = createReducer(
  initialState,
  on(fetchStore, (state) => ({ ...state, isLoading: true })),
  on(receiveStore, (state, { store }) => ({
    ...state,
    isLoading: false,
    store,
  })),
  on(fetchItemsByCategory, (state) => ({ ...state, isLoading: true })),
  on(receiveItemsByCategory, (state, { selectedItems, items }) => {
    return {
      ...state,
      store: {
        ...state.store,
        items,
      },
      selectedItems,
      isLoading: false,
    };
  }),
  on(receiveSearchedItems, (state, { selectedItems, items }) => {
    return {
      ...state,
      store: {
        ...state.store,
        items,
      },
      selectedItems,
      isLoading: false,
    };
  })
);
