import { Subscription } from 'rxjs';
import { AppState } from './../../ui.app.reducer';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  cargando: boolean;
  subscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private store: Store<AppState>
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.subscription = this.store.select('ui')
    .subscribe( ui => this.cargando = ui.isLoading);
  }

  login(e: Event): void{
    event.preventDefault();
    console.log(this.form.value);
    const value = this.form.value;
    this.authService.login(value.email, value.password);
  }


  private buildForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

}
