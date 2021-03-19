import { AppState } from './../../../ui.app.reducer';
import { Component, OnInit } from '@angular/core';

// Store
import { Store } from '@ngrx/store';

// Servicio
import { CartsService } from './../../carts.service';


// Modelo
import { Product } from './../../../products/product.model';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  products: Product[] = [];

  constructor(
    public cartsService: CartsService,
    public store: Store<AppState>

  ) {this.store.select('cartProducts').subscribe(
    data => {
      console.log('desde el store');
      console.log(data.products);
      this.products = data.products;
    }
  ) }

  ngOnInit(): void {
  }

  orderCart(){
    this.cartsService.orderCart()
    .then(
      () =>{
        /* console.log('cart creado'); */
      }
    ).catch(
      () => {
        /* console.log('Errrror cart NO creado'); */

      }
    )
  }

  deleteProduct(produc: Product){
    console.log(produc.id);
    this.cartsService.deleteProduct(produc.id);
  }

}
