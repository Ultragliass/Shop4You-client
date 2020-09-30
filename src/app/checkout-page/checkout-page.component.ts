import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ICartItem } from 'src/models/cartItem';
import { IUser } from 'src/models/user';
import { fetchCart, placeOrder } from 'src/store/actions/cart';
import { IState } from '../app.module';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css'],
})
export class CheckoutPageComponent implements OnInit {
  cartItems: ICartItem[];

  userData: IUser;

  totalPrice: number = 0;

  cartId: string;

  search: string;

  constructor(
    private store: Store<IState>,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.store.subscribe((state) => {
      if (state.cart.currentOrderId) {
        router.navigateByUrl('/receipt');
        return;
      }

      this.cartId = state.user.userData?.currentCartId;

      if (!this.cartId) {
        return;
      }

      if (!this.cartItems) {
        this.store.dispatch(fetchCart({ cartId: this.cartId }));
      }

      this.userData = state.user.userData;

      this.cartItems = state.cart.cartItems;

      this.totalPrice = this.cartItems.reduce((total, item) => {
        return total + item.totalPrice;
      }, 0);
    });
  }

  form = this.fb.group({
    city: this.fb.control('', [Validators.required]),
    street: this.fb.control('', [Validators.required]),
    shippingDate: this.fb.control('', [Validators.required]),
    creditCard: this.fb.control('', [
      Validators.required,
      Validators.maxLength(20),
      Validators.minLength(10),
    ]),
  });

  ngOnInit() {
    this.form.setValue({
      city: this.userData.city,
      street: this.userData.street,
      shippingDate: null,
      creditCard: null,
    });
  }

  placeOrder() {
    const { city, street, shippingDate, creditCard } = this.form.value;

    this.store.dispatch(
      placeOrder({
        cartId: this.userData.currentCartId,
        finalPrice: this.totalPrice,
        deliveryCity: city,
        deliveryDate: shippingDate,
        deliveryStreet: street,
        lastCreditDigits: creditCard,
      })
    );
  }

  goBack(): void {
    this.router.navigateByUrl('/store');
  }
}
