import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ICategory, IItem } from 'src/models/store';
import { IUser } from 'src/models/user';
import { fetchItemsByCategory, searchItems } from 'src/store/actions/store';
import { ping, startCreateCart } from 'src/store/actions/user';
import { IState } from '../app.module';

@Component({
  selector: 'app-store-page',
  templateUrl: './store-page.component.html',
  styleUrls: ['./store-page.component.css'],
})
export class StorePageComponent implements OnInit {
  categories: ICategory[];

  items: IItem[];

  selectedItems: IItem[];

  currentCategory: MatButton;

  currentCategoryId: string;

  search: string = '';

  constructor(private store: Store<IState>, private router: Router) {
    this.store.subscribe((state) => {
      if (!state.user.userData.currentCartId && !state.user.isLoading) {
        this.store.dispatch(startCreateCart());
      }
    });
  }

  toggleCategory(el: MatButton, categoryId: string | null): void {
    el.disabled = true;

    if (this.currentCategory) {
      this.currentCategory.disabled = false;
    }

    this.currentCategoryId = categoryId;

    this.currentCategory = el;

    this.search = '';

    this.store.dispatch(fetchItemsByCategory({ categoryId }));
  }

  searchItems(): void {
    if (!this.search) {
      this.selectedItems = this.items;
      return;
    }

    if (this.currentCategory) {
      this.currentCategory.disabled = false;
    }

    this.currentCategory = null;

    this.store.dispatch(searchItems({ term: this.search }));
  }

  ngOnInit(): void {
    this.store.dispatch(ping());

    this.store.dispatch(fetchItemsByCategory({ categoryId: null }));

    this.store.subscribe((state) => {
      this.selectedItems = state.store.selectedItems;

      if (!localStorage.getItem('token')) {
        this.router.navigateByUrl('/');
      }

      if (!state.store.store) {
        return;
      }

      if (!this.categories) {
        this.categories = state.store.store.categories;
      }

      if (!this.items) {
        this.items = state?.store.store.items;
      }
    });
  }
}
