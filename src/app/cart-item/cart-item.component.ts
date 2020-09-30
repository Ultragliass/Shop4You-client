import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ICartItem } from 'src/models/cartItem';
import { IItem } from 'src/models/store';
import { startRemoveItem } from 'src/store/actions/cart';
import { IState } from '../app.module';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent implements OnInit {
  @Input() cartItem: ICartItem;

  item: IItem;

  cartId: string;

  constructor(private store: Store<IState>) {}

  ngOnInit(): void {
    this.store.subscribe((state) => {
      this.item = state.store.store.items.find(
        (item) => item._id === this.cartItem.itemId
      );

      if (!state.user) {
        return;
      }

      this.cartId = state.user.userData?.currentCartId;
    });
  }

  deleteItem(): void {
    this.store.dispatch(
      startRemoveItem({ cartId: this.cartId, cartItemId: this.cartItem._id })
    );
  }
}
