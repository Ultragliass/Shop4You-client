import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IStore } from 'src/models/store';
import { fetchStore } from 'src/store/actions/store';
import { startAuthentication } from 'src/store/actions/user';
import { IState } from './app.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private store: Store<IState>) {
    this.store.dispatch(fetchStore());

    if (localStorage.getItem('token')) {
      this.store.dispatch(startAuthentication());
    }
  }
}
