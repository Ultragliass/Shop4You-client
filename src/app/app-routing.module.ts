import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { StorePageComponent } from './store-page/store-page.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';

const routes: Routes = [
  { path: '', component: LoginPageComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterPageComponent, pathMatch: 'full' },
  { path: 'store', component: StorePageComponent, pathMatch: 'full' },
  { path: 'checkout', component: CheckoutPageComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
