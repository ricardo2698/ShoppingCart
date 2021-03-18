import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    public authService: AuthService ) { }

  canActivate(){
    return this.authService.isAuth();
  }
}
