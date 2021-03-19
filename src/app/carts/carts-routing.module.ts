import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


// Components
import { CartComponent } from './components/cart/cart.component'
import { ListCartComponent } from './components/list-cart/list-cart.component';



const routes: Routes = [
  {
    path: '',
    component: CartComponent
  },
  {
    path: 'list',
    component: ListCartComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartsRoutingModule { }
