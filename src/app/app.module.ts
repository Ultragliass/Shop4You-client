import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { LoginPageComponent } from './login-page/login-page.component';
import { EffectsModule } from '@ngrx/effects';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { IStoreState, storeReducer } from '../store/reducers/store';
import { IUserState, userReducer } from '../store/reducers/user';
import { ICartState, cartReducer } from '../store/reducers/cart';
import { StoreEffects } from '../store/effects/store';
import { UserEffects } from '../store/effects/user';
import { CartEffects } from '../store/effects/cart';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RegisterPageComponent } from './register-page/register-page.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { StorePageComponent } from './store-page/store-page.component';
import { ItemComponent } from './item/item.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { FormsModule } from '@angular/forms';
import { CartComponent } from './cart/cart.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CartItemComponent } from './cart-item/cart-item.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { CheckoutItemComponent } from './checkout-item/checkout-item.component';

export interface IState {
  store: IStoreState;
  user: IUserState;
  cart: ICartState;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    StorePageComponent,
    ItemComponent,
    DialogComponent,
    CartComponent,
    CartItemComponent,
    CheckoutPageComponent,
    CheckoutItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule,
    FormsModule,
    MatSidenavModule,
    StoreModule.forRoot<IState>({
      store: storeReducer,
      user: userReducer,
      cart: cartReducer,
    }),
    EffectsModule.forRoot([StoreEffects, UserEffects, CartEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
