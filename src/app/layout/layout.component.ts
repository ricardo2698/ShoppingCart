import { CartsService } from './../carts/carts.service';
import { ProductsService } from './../products/products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor( public productsService: ProductsService,
    public cartsService: CartsService) { }

  ngOnInit(): void {
    this.productsService.productListener();
    this.cartsService.getListCarts();
    this.cartsService.initCurrentCartList();

  }

}
