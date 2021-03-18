import { Injectable } from '@angular/core';

// redux
import { Store } from '@ngrx/store';
import { AppState } from './../ui.app.reducer';
import * as fromAction from './../shared/ui.actions';
import { SetUserAction, UnSetUserAction } from './auth.actions';

// rxjs
import { map } from 'rxjs/operators';

// Firebase
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subscription } from 'rxjs';

// ES6 Modules or TypeScript
import Swal from 'sweetalert2';

import { User } from './user.model';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: User;

  private  userSuscription: Subscription = new Subscription();

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private afDB: AngularFirestore,
    private store: Store<AppState>
  ) { }


  // createUser
  createUser( name, email, password ){

    this.store.dispatch( new fromAction.ActivateLoadingAction() );

    this.afAuth.createUserWithEmailAndPassword(email, password)
    .then( res => {
      /* console.log(res); */
      const user:User = {
        uid: res.user.uid,
        name: name,
        email: res.user.email
      };

      this.afDB.doc(`${ user.uid }/usuario`)
          .set( user )
          .then( () => {
            this.router.navigate(['/home']);
            this.store.dispatch( new fromAction.DeactivateLoadingAction());
          });

    })
    .catch( error => {
      console.log(error.message);
      this.swAlert('Error!',error.message);
      this.store.dispatch( new fromAction.DeactivateLoadingAction());
    })
  }

  // log in
  login(email: string, password: string ){

    this.store.dispatch( new fromAction.ActivateLoadingAction() );

    this.afAuth.signInWithEmailAndPassword(email, password)
    .then(
      res=> {
        console.log(res);

        this.router.navigate(['/']);
        this.store.dispatch( new fromAction.DeactivateLoadingAction() );
      }
    )
    .catch(
      error => {
        console.log(error);
        this.store.dispatch( new fromAction.DeactivateLoadingAction() );
        this.swAlert('Error!',error.message);
      }
    )
  }

  initAuthListainer(){
    this.afAuth.authState.subscribe( fbUser => {
      if( fbUser ){
        this.userSuscription = this.afDB.doc(`${ fbUser.uid }/usuario`).valueChanges()
        .subscribe( (usuarioObj: any) => {
          console.log(usuarioObj);
          const newUser = new User(usuarioObj);
          this.user = usuarioObj;
          this.store.dispatch( new SetUserAction(newUser));
        } )
      }else{
        this.user = null;
        this.userSuscription.unsubscribe();
      }
    });
  }

  // close session
  logout(){
    this.router.navigate(['/auth/login']);
    this.afAuth.signOut();
    this.store.dispatch( new UnSetUserAction);
  }

  isAuth(){
    return this.afAuth.authState.pipe(
      map(
        fbUser => {
          if( fbUser === null){
            this.router.navigate(['/auth/login']);
          }
          return fbUser != null;
        }
      )
    );
  }

  getUser(){
    return {... this.user};
  }

  swAlert(title: string, text:string){
    Swal.fire({
      title: title,
      text: text,
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }
}
