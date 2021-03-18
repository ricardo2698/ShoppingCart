import { AppState } from './../../ui.app.reducer';
import { Subscription } from 'rxjs';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  cargando: boolean;
  subscription: Subscription = new Subscription();


  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    private store: Store<AppState>
  ) {
    this.buildForm();

}

  ngOnInit(): void {
    this.store.select('ui')
    .subscribe( ui => this.cargando = ui.isLoading);
  }

  register(e:Event){
    event.preventDefault();
    console.log(this.form.value);
    const { name, email, password } = this.form.value;
    this.authService.createUser(name, email, password);
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required]],
      name: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

}
