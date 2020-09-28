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
import { StoreEffects } from '../store/effects/store';
import { UserEffects } from '../store/effects/user';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RegisterPageComponent } from './register-page/register-page.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

export interface IState {
  store: IStoreState;
  user: IUserState;
}

@NgModule({
  declarations: [AppComponent, LoginPageComponent, RegisterPageComponent],
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
    StoreModule.forRoot<IState>({ store: storeReducer, user: userReducer }),
    EffectsModule.forRoot([StoreEffects, UserEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
