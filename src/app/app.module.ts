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
import { StoreEffects } from '../store/effects/store';

export interface IState {
  store: IStoreState;
}

@NgModule({
  declarations: [AppComponent, LoginPageComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpClientModule,
    StoreModule.forRoot<IState>({ store: storeReducer }),
    EffectsModule.forRoot([StoreEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
