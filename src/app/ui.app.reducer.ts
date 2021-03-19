import { ActionReducerMap } from '@ngrx/store';
import * as fromUI from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';
import * as fromProduct from './products/product.reducer';
import * as fromCartProducts from './carts/carts.reducer';


export interface AppState {
  ui: fromUI.State;
  auth: fromAuth.AuthState;
  products: fromProduct.ProductState;
  cartProducts: fromCartProducts.ProductStateCart
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: fromUI.uiReducer,
  auth: fromAuth.authReducer,
  products: fromProduct.productsReducer,
  cartProducts: fromCartProducts.cartProdcutsReducer
}
