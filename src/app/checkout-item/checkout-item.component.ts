import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ICartItem } from 'src/models/cartItem';
import { IItem } from 'src/models/store';
import { IState } from '../app.module';

@Component({
  selector: 'app-checkout-item',
  templateUrl: './checkout-item.component.html',
  styleUrls: ['./checkout-item.component.css'],
})
export class CheckoutItemComponent implements OnInit {
  @Input() cartItem: ICartItem;

  @Input() search: string;

  item: IItem;

  color: string = 'white';

  constructor(private store: Store<IState>) {}

  ngOnInit(): void {
    this.store.subscribe((state) => {
      this.item = state.store.store.items.find(
        (item) => item._id === this.cartItem.itemId
      );
    });
  }
}
