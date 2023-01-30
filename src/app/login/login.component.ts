import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [`
  :host{
    flex: 1 1 100%;
    max-width: 100%;
    width: 100%;
    height: 100%;
    background-color: #fff;
    /* background: linear-gradient(141deg, #14ebec 0%, #04fda1 51%, #41ffe2 75%); */
  }
  .login__container {
    padding: 20px 40px;
    background-color: rgba(0, 145, 150, 0.4);
    color: #000;
    max-width: 400px;
    width: 100%;
    margin: 10px;
    max-height: 400px !important;
    height: 100%;
  }
  .rmv__margin {
    margin: 0;
  }
  .mat-display-1 {
    margin-bottom: 2rem;
  }
  .login__btn {
    font-size: 2rem;
    padding: 0.5rem;
    margin-top: 0.5rem;
  }
  .input__prefix {
    color: black;
    margin-right: 10px;
  }
`]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  authenticating = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  flickNSwish () {
    if (this.loginForm.valid) {
      this.authenticating = true;
      const creds = (Object as any).assign({}, this.loginForm.value);
      this.authService.login(creds.email, creds.password)
        .subscribe( () => {
          this.authenticating = false;
          this.router.navigate(['/profile']);
        }, err => {
          this.authService.logout();
          this.authenticating = false;
          console.warn(err);
          const msg = window._custom.checkIfExists(err, `error.message`) ? err.error.message :
                      window._custom.checkIfExists(err, 'error') && typeof err.error === 'string' ? err.error : `Error while logging in.`;
          this.snackBar.open(msg, '', {
            duration: 3000
          });
        });

    } else {
      console.error('Error In the Form');
    }
  }

}
