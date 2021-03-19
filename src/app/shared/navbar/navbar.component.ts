import { CartsService } from './../../carts/carts.service';
import { ProductsService } from './../../products/products.service';
import { Subscription } from 'rxjs';
import { AppState } from './../../ui.app.reducer';
import { AuthService } from './../../auth/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  name: string;
  email: string;
  subscription: Subscription = new Subscription;

  countProduts: number;

  constructor(
    public authService: AuthService,
    public productsService: ProductsService,
    public cartsService: CartsService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {

    this.subscription = this.store.select('auth')
    .pipe(
      filter( auth => auth.user != null
      )
    )
    .subscribe(
      auth => {
        this.name = auth.user.name;
        this.email = auth.user.email;
      }
    );

    // conteo para la cantidad de productos agregados al carrrito
    this.store.select('cartProducts')
    .subscribe(
      data => {
        this.countProduts =data.products.length;
      }
    )
  };


  logaout(){
    this.authService.logout();
    this.productsService.cancelSubcriptions();
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
