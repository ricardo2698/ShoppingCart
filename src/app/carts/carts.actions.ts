import { Action } from '@ngrx/store';
import { Product } from '../products/product.model';


export enum CartsTypesActyon {
  SET_CART_PRODUCTS = '[Cart-Products] Set Cart Products',
  UN_SET_CART_PRODUCTS = '[Cart-Products] Set Cart Products'
}

export class setCartProdutsAction implements Action {
  readonly type = CartsTypesActyon.SET_CART_PRODUCTS;
  constructor(public product: Product[]) {}
}



export type acciones = setCartProdutsAction;
