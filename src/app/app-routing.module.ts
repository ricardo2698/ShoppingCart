import { AuthGuardService } from './auth/auth-guard.service';
import { LayoutComponent } from './layout/layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [ AuthGuardService ],
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m=>m.HomeModule)
      },
      {
        path: 'products',
        loadChildren: () => import('./products/products.module').then(m=>m.ProductsModule)
      },
      {
        path: 'cart',
        loadChildren: () => import('./carts/carts.module').then(m=>m.CartsModule)
      }
    ]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
