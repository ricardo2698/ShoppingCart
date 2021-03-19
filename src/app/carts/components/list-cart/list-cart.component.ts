import { Cart } from './../../cart.model';
import { CartsService } from './../../carts.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-cart',
  templateUrl: './list-cart.component.html',
  styleUrls: ['./list-cart.component.scss']
})
export class ListCartComponent implements OnInit {

  carts: Cart[] = [];

  constructor(
    public cartsService: CartsService
  ) { }

  ngOnInit(): void {


    this.carts = this.cartsService.listCarts();
    console.log(this.carts);

  }

  deleteCart(){

  }

}
