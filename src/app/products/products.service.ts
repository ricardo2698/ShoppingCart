import { Subscription } from 'rxjs';
import { SetProdutsAction, UnSetProdutsAction } from './product.actions';
import { AppState } from './../ui.app.reducer';
import { Product } from './product.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private afDB: AngularFirestore,
    private store: Store<AppState>) { }

  product: Product[] = [];

  productsListainerSubcription: Subscription = new Subscription;
  productsAllSubcription: Subscription = new Subscription;

  productListener(){
    this.productsListainerSubcription = this.store.select('auth')
    .pipe(
      filter( auth => auth != null)
    )
    .subscribe( () => this.getAllProducts());
  }

  private getAllProducts(): void {
    this.productsAllSubcription = this.afDB.collection(`Products`)
        .snapshotChanges()
        .pipe(
          map( docData => {
            return docData.map( (doc: any) => {
              return {
                id: doc.payload.doc.id,
                name: doc.payload.doc.data().name,
                sku: doc.payload.doc.data().sku,
                description: doc.payload.doc.data().description,
                price: doc.payload.doc.data().price,
                img: doc.payload.doc.data().img,

              }
            } )
          })
        )
        .subscribe(
          (product: any[]) => {
            console.log(product);
            this.store.dispatch( new SetProdutsAction(product));
          }
          )
  }

  cancelSubcriptions(){
    this.productsAllSubcription.unsubscribe();
    this.productsListainerSubcription.unsubscribe();
    this.store.dispatch( new UnSetProdutsAction());
  }
}
