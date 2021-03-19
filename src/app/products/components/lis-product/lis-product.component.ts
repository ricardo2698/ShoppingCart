import { Product } from './../../product.model';
import { AppState } from './../../../ui.app.reducer';
import { Store } from '@ngrx/store';
import { ProductsService } from './../../products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lis-product',
  templateUrl: './lis-product.component.html',
  styleUrls: ['./lis-product.component.scss']
})
export class LisProductComponent implements OnInit {

  products: Product[] = [];
  constructor(
    public store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.select('products').subscribe(
      data => {
        this.products = data.products;
        /* console.log(data.products); */
      }
    )
  };

}
