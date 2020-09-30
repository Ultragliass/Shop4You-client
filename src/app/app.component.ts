import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { fetchStore } from 'src/store/actions/store';
import {
  dismissError,
  logout,
  startAuthentication,
} from 'src/store/actions/user';
import { IState } from './app.module';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  error: string | null;

  isLoggedIn: boolean = false;

  constructor(private store: Store<IState>, private snackBar: MatSnackBar) {
    this.store.dispatch(fetchStore());

    if (localStorage.getItem('token')) {
      this.store.dispatch(startAuthentication());
    }

    this.store.subscribe((state) => {
      this.isLoggedIn = state.user.isLoggedIn;

      if (state.user.error !== this.error) {
        this.error = state.user.error;

        this.openSnackbar(state.user.error);
      }
    });
  }

  openSnackbar(message: string | null) {
    if (!message) {
      return;
    }

    this.snackBar.open(message, 'close', {
      duration: 2000,
    });

    this.store.dispatch(dismissError());
  }

  logoutUser() {
    this.store.dispatch(logout());
  }

  get token() {
    return localStorage.getItem('token');
  }
}
