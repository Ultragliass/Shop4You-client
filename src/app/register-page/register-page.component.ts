import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { startCheck, startRegister } from 'src/store/actions/user';
import { IState } from '../app.module';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent implements OnInit {
  isLoggedIn: boolean;

  step1Valid: boolean = false;

  constructor(
    private store: Store<IState>,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.store.subscribe((state) => {
      if (state.user.isLoggedIn) {
        router.navigateByUrl('/');
      }

      if (state.user.step1Valid) {
        this.step1Valid = state.user.step1Valid;

        this.step1.disable();

        this.step2.enable();
      }
    });
  }

  checkPasswords(group: FormGroup) {
    const { password, confirmPassword } = group.value;

    if (password !== confirmPassword) {
      group.controls['confirmPassword'].setErrors({ mustMatch: true });
    } else {
      group.controls['confirmPassword'].setErrors(null);
    }
  }

  step1 = this.fb.group(
    {
      id: this.fb.control('', [
        Validators.required,
        Validators.pattern(/^[0-9]{8,9}$/),
      ]),
      email: this.fb.control('', [
        Validators.required,
        Validators.pattern(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ),
      ]),
      password: this.fb.control('', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,30}$/),
      ]),
      confirmPassword: this.fb.control('', [Validators.required]),
    },
    {
      validator: this.checkPasswords,
    }
  );

  step2 = this.fb.group({
    city: this.fb.control('', [Validators.required]),
    street: this.fb.control('', [Validators.required]),
    name: this.fb.control('', [Validators.required]),
    lastname: this.fb.control('', [Validators.required]),
  });

  continue() {
    const { id, email, password } = this.step1.value;

    this.store.dispatch(startCheck({ id, email, password }));
  }

  register() {
    const { id, email, password } = this.step1.value;

    const { city, street, name, lastname } = this.step2.value;

    this.store.dispatch(
      startRegister({ id, email, password, city, street, name, lastname })
    );
  }

  ngOnInit(): void {
    if (this.isLoggedIn) {
      this.router.navigateByUrl('/');
    }

    this.step2.disable();
  }
}
