import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';

// Componentes
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';


// Modulos
import { SharedModule } from './shared/shared.module';

    // redux
  import { StoreModule } from '@ngrx/store';
  import { appReducers } from './ui.app.reducer';
  import { StoreDevtoolsModule } from '@ngrx/store-devtools';

  // Modulos Firebase
  import { AngularFireModule } from '@angular/fire';
  import { AngularFireAuthModule } from '@angular/fire/auth';
  import { AngularFirestoreModule } from '@angular/fire/firestore';

  import { environment } from './../environments/environment.prod';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';









@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    StoreModule.forRoot( appReducers ),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    SharedModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
