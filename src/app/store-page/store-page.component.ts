import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ICategory, IItem } from 'src/models/store';
import { fetchItemsByCategory } from 'src/store/actions/store';
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

  constructor(private store: Store<IState>, private router: Router) {
    this.store.subscribe((state) => {
      this.selectedItems = state.store.selectedItems;

      if (!state.store.store) {
        return;
      }

      if (!this.categories) {
        this.categories = state?.store.store.categories;
      }

      if (!this.items) {
        this.items = state?.store.store.items;
      }

      // if (!state.user.isLoggedIn) {
      //   router.navigateByUrl('/');
      //
      //   return;
      // }

      if (!state.user.userData) {
        return;
      }

      if (!state.user.userData.currentCartId && !state.user.isLoading) {
        store.dispatch(startCreateCart());
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

    this.store.dispatch(fetchItemsByCategory({ categoryId }));
  }

  ngOnInit(): void {
    this.store.dispatch(ping());

    this.store.dispatch(fetchItemsByCategory({ categoryId: null }));
  }
}
