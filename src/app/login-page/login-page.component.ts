import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IStoreState } from 'src/store/reducers/store';
import { IState } from '../app.module';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  itemAmount$: Observable<number>;

  categoryAmount$: Observable<number>;

  numOfOrders$: Observable<number>;

  constructor(private store: Store<IState>) {
    this.itemAmount$ = this.store.select(
      (state) => state.store.store?.items.length
    );

    this.categoryAmount$ = this.store.select(
      (state) => state.store.store?.categories.length
    );

    this.numOfOrders$ = this.store.select(
      (state) => state.store.store?.numOfOrders
    );
  }
}
