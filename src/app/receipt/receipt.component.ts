import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { printReceipt } from 'src/store/actions/cart';
import { IState } from '../app.module';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css'],
})
export class ReceiptComponent {
  orderId: string;

  constructor(private store: Store<IState>, private router: Router) {
    this.store.subscribe((state) => {
      if (!state.cart.currentOrderId) {
        router.navigateByUrl('/');
      }

      this.orderId = state.cart?.currentOrderId;
    });
  }

  printReceipt() {
    this.store.dispatch(printReceipt({ orderId: this.orderId }));
  }

  goBack() {
    this.router.navigateByUrl('/');
  }
}
