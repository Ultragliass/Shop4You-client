import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ICartItem } from 'src/models/cartItem';
import { fetchCart } from 'src/store/actions/cart';
import { IState } from '../app.module';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  buttonLeft: string = 'left: 0px';

  navLeft: string = 'left: -400px';

  cartItems: ICartItem[];

  totalPrice: number = 0;

  cartId: string;

  constructor(private store: Store<IState>, private router: Router) {
    this.store.subscribe((state) => {
      this.cartId = state.user.userData?.currentCartId;

      if (!this.cartId) {
        return;
      }

      if (!this.cartItems) {
        this.store.dispatch(fetchCart({ cartId: this.cartId }));
      }

      this.cartItems = state.cart.cartItems;

      this.totalPrice = this.cartItems.reduce((total, item) => {
        return total + item.totalPrice;
      }, 0);
    });
  }

  goToCheckout(): void {
    this.router.navigateByUrl('/checkout');
  }

  toggleCart(): void {
    if (this.buttonLeft === 'left: 0px') {
      this.buttonLeft = 'left: 400px';

      this.navLeft = 'left: 0px';
    } else {
      this.buttonLeft = 'left: 0px';

      this.navLeft = 'left: -400px';
    }
  }
}
