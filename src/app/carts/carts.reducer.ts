import { Product } from '../products/product.model';
import * as fromCart from './carts.actions';

export interface ProductStateCart{
  products: Product[];
}


const estadoUnicial: ProductStateCart ={
  products: []
}

export function cartProdcutsReducer(state = estadoUnicial, action: fromCart.acciones ): ProductStateCart {
  switch ( action.type ) {
    case fromCart.CartsTypesActyon.SET_CART_PRODUCTS:
      return {
        products: [...action.product]
      };

      default:
        return state;
  }
}
