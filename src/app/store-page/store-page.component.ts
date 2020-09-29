import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ICategory, IItem } from 'src/models/store';
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

  currentCartId: string;

  constructor(private store: Store<IState>, private router: Router) {
    this.store.subscribe((state) => {
      if (!state.store.store) {
        return;
      }

      this.categories = state?.store.store.categories;

      this.items = state?.store.store.items;

      if (!state.user.isLoggedIn) {
        router.navigateByUrl('/');
      }

      if (!state.user.userData) {
        return;
      }

      if (!state.user.userData.currentCartId && !state.user.isLoading) {
        store.dispatch(startCreateCart());
      }
    });
  }

  ngOnInit(): void {
    this.store.dispatch(ping());
  }
}
