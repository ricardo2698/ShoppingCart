import { Product } from './../products/product.model';
export interface Cart{
  id?: string;
  uid: string
  products?: Product[];
  status: boolean
}
