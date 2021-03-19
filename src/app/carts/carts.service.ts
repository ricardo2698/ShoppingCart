import { filter, map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';

// Redux
import { setCartProdutsAction } from './carts.actions';
import { AppState } from './../ui.app.reducer';
import { Store } from '@ngrx/store';

// Modelos
import { Cart } from './cart.model';
import { Product } from './../products/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartsService {

  products: Product[] = [];
  cart: Cart;
  carts: Cart[];

  constructor(
    private store: Store<AppState>,
    public authService: AuthService,
    private afDB: AngularFirestore,


  ) { }

  // listar priducos de un carrito
  listCart(){
    return this.products;
  }

  addCart(product: Product){
    this.products = [...this.products, product];

    const user = this.authService.getUser();

    this.afDB.doc(`${user.uid}/currentCart/`)
            .collection('prodcuts').add({...this.products});

    this.store.dispatch( new setCartProdutsAction(this.products));
    console.log(this.products);
  }

  initCurrentCartList(){
    this.store.select('auth')
    .pipe(                              // pipe para transformar la info, ya que en un momento del subcribe este seria null
      filter( auth => auth.user != null)
    )
    .subscribe( auth => {
      this.cartProductsCurrrent(auth.user.uid);
    })
  }

  private cartProductsCurrrent(uid:string){

    this.afDB.collection(`${uid}/currentCart/prodcuts`)
    .snapshotChanges()
    /* .pipe(
      map( docData => {
        return docData.map( (doc:any) => {
          return {
            id: doc.payload.doc.id,
            name: doc.payload.doc.name,
            sku: doc.payload.doc.data().sku,
            description: doc.payload.doc.data().description,
            price: doc.payload.doc.data().price,
            img: doc.payload.doc.data().img,
          }
        })
      })
    ) */
    .subscribe( (collecion: any[]) => {
      console.log('currend data');
      console.log(collecion);
    })
  }


  orderCart(){
    return this.orderSetCart(this.products);
  }

  private orderSetCart(products: Product[]){
    const user = this.authService.getUser();

    this.cart = {
      uid: user.uid,
      products: products,
      status: false
    }
    return this.afDB.doc(`${user.uid}/cart-products/`)
    .collection('carts').add({...this.cart})
  }


  getListCarts(){
    return this.store.select('auth')
    .pipe(
      filter( auth => auth.user != null )
    )
    .subscribe( auth => {

      this.afDB.collection(`${auth.user.uid}/cart-products/carts`)
              .snapshotChanges()
              .pipe(
                map( docData => {
                  return docData.map(( doc:any )=> {
                    return{
                      uid: doc.payload.doc.id,
                      products: doc.payload.doc.data().products,
                      status: doc.payload.doc.data().status,
                    }
                  })
                })

      )
      .subscribe( (colleccion: Cart[])=>{
        this.carts = colleccion;
        /* console.log(colleccion); */
      } )
    })
  }

  // listar los carritos del usuario
  listCarts(){
    return this.carts;

  }

  deleteProduct(id: string){
    const user = this.authService.getUser();
    this.afDB.doc(`${user.uid}/currentCart/prodcuts/${id}`)
    .delete()
    .catch( err => console.log(err));
  }
}
