import { Subscription } from 'rxjs';
import { AppState } from './../../ui.app.reducer';
import { AuthService } from './../../auth/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  name: string;
  email: string;
  subscription: Subscription = new Subscription;

  constructor(
    public authService: AuthService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {

    this.subscription = this.store.select('auth')
    .pipe(
      filter( auth => auth.user != null
      )
    )
    .subscribe(
      auth => {
        this.name = auth.user.name;
        this.email = auth.user.email;
      }
    );
  };


  logaout(){
    this.authService.logout();
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
