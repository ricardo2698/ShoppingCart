import { CartsService } from './../../../carts/carts.service';
import { Product } from './../../product.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() product: Product;

  constructor(
    public cartsService: CartsService
  ) { }

  ngOnInit(): void {
  }


  addCart():void {
    console.log(this.product);
    this.cartsService.addCart(this.product);
  }
}
