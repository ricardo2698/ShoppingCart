import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { LisProductComponent } from './components/lis-product/lis-product.component';


const routes: Routes = [
  {
    path: '',
    component: LisProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
