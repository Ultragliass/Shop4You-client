import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { IItem } from 'src/models/store';
import { IState } from '../app.module';
import { DialogComponent } from '../dialog/dialog.component';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {
  @Input() id: string;

  items: IItem[];

  item: IItem;

  constructor(
    private store: Store<IState>,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<DialogComponent>
  ) {}

  ngOnInit(): void {
    this.store.subscribe((state) => {
      if (this.items && this.item) {
        return;
      }

      this.items = state.store.store.items;

      this.item = this.items.find((_item) => _item._id === this.id);
    });
  }

  openDialogue(): void {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }

      console.log(result)
    });
  }
}
