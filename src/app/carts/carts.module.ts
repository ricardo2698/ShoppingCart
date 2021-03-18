import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartsRoutingModule } from './carts-routing.module';
import { CartComponent } from './components/cart/cart.component';
import { ListCartComponent } from './components/list-cart/list-cart.component';


@NgModule({
  declarations: [CartComponent, ListCartComponent],
  imports: [
    CommonModule,
    CartsRoutingModule
  ]
})
export class CartsModule { }
