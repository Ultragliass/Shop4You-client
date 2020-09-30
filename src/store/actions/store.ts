import { createAction, props } from '@ngrx/store';
import { IItem, IStore } from '../../models/store';

export const fetchStore = createAction('GET_STORE_PENDING');

export const receiveStore = createAction(
  'GET_STORE_SUCCESS',
  props<{ store: IStore }>()
);

export const fetchItemsByCategory = createAction(
  'GET_ITEMS_BY_CATEGORY',
  props<{ categoryId: string }>()
);

export const receiveItemsByCategory = createAction(
  'GET_ITEMS_BY_CATEGORY_SUCCESS',
  props<{ selectedItems: IItem[]; items: IItem[] }>()
);

export const searchItems = createAction(
  'SEARCH_ITEMS_PENDING',
  props<{ term: string }>()
);

export const receiveSearchedItems = createAction(
  'SEARCH_ITEMS_COMPLETE',
  props<{ selectedItems: IItem[]; items: IItem[] }>()
);
