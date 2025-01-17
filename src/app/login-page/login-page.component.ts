import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IState } from '../app.module';
import { startLogin } from '../../store/actions/user';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  itemAmount$: Observable<number>;

  categoryAmount$: Observable<number>;

  numOfOrders$: Observable<number>;

  isLoggedIn: boolean | null;

  name: string;

  currentCartDate: Date | null;

  lastOrderDate: Date | null;

  role: string | null;

  constructor(
    private store: Store<IState>,
    private fb: FormBuilder,
    private router: Router
  ) {}

  form = this.fb.group({
    email: this.fb.control('', [Validators.required]),
    password: this.fb.control('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  ngOnInit() {
    this.itemAmount$ = this.store.select(
      (state) => state.store.store?.items.length
    );

    this.categoryAmount$ = this.store.select(
      (state) => state.store.store?.categories.length
    );

    this.numOfOrders$ = this.store.select(
      (state) => state.store.store?.numOfOrders
    );

    this.store.subscribe((state) => {
      this.isLoggedIn = state.user.isLoggedIn;

      if (state.user.userData) {
        this.name = state.user.userData.name;
      }

      if (!state.user.userData) {
        return;
      }

      this.currentCartDate = state.user.currentCartDate;

      this.lastOrderDate = state.user.lastOrderDate;

      this.role = state.user.userData.role;
    });
  }

  login() {
    const { email, password } = this.form.value;

    this.store.dispatch(startLogin({ email, password }));
  }

  goToRegister() {
    this.router.navigateByUrl('/register');
  }

  goToStore() {
    this.router.navigateByUrl('/store');
  }
}
