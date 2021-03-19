import { Product } from './product.model';
import * as fromProduct from'./product.actions';


export interface ProductState {
  products: Product[];
}

const estadoIncial: ProductState = {
  products: []
}

export function productsReducer(state = estadoIncial, action: fromProduct.acciones ): ProductState{
  switch(action.type){

    case fromProduct.SET_PRODUCTS:
      return {
        products: [...action.products.map( product => {
          return {
            ...product
          };
        })]
      };

      case fromProduct.UNSET_PRODUCTS:
        return {
          products: []
        };

      default:
      return state;

  }
}
