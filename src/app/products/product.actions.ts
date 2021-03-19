import { Product } from './product.model';
import { Action } from '@ngrx/store';

export const SET_PRODUCTS = '[Product] Set products';
export const UNSET_PRODUCTS = '[Product] UnSet products';
export const COUNT_PRODUCTS = '[Product] Count products';


export class SetProdutsAction implements Action {
  readonly type =  SET_PRODUCTS;
  constructor(public products: Product[]) {}
}

export class UnSetProdutsAction implements Action {
  readonly type =  UNSET_PRODUCTS;
}


export type acciones = SetProdutsAction |
                      UnSetProdutsAction ;

