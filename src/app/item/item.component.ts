import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { IItem } from 'src/models/store';
import { startAddItem } from 'src/store/actions/cart';
import { IState } from '../app.module';
import { DialogComponent } from '../dialog/dialog.component';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {
  @Input() id: string;

  role: string;

  items: IItem[];

  item: IItem;

  cartId: string;

  constructor(private store: Store<IState>, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.store.subscribe((state) => {
      if (this.items && this.item) {
        return;
      }

      this.role = state.user.userData?.role;

      this.items = state.store.store.items;

      this.item = this.items.find((_item) => _item._id === this.id);

      this.cartId = state.user.userData.currentCartId;
    });
  }

  openDialogue(): void {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe((amount) => {
      if (!amount) {
        return;
      }

      this.store.dispatch(
        startAddItem({ itemId: this.item._id, amount, cartId: this.cartId })
      );
    });
  }
}
