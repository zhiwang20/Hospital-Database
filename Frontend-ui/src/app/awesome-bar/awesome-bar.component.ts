
import {takeWhile, filter} from 'rxjs/operators';
import { Component, Output, EventEmitter } from '@angular/core';

import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
// import { ApiService } from '../api-service/api.service';

@Component({
  selector: 'app-awesome-bar',
  templateUrl: './awesome-bar.component.html',
  styles: [`
  :host {
    display: flex;
  }
  .app__toolbar{
    position: fixed;
  }
  mat-icon {
    margin-right: 10px;
    cursor: pointer;
  }
  .example-spacer {
    flex: 1 1 auto;
  }
  `]
})
export class AwesomeBarComponent {
  @Output() awesomeNavToggle = new EventEmitter<boolean>();

  canGoBack = false;
  title = 'Hospital Management System';
  isLoggedIn$: Observable<boolean>;

  constructor( private router: Router, private _location: Location,
    /* private apiService: ApiService, */ private authService: AuthService
  ) {

    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  toggle() {
    this.awesomeNavToggle.emit(true);
  }

  goback () {
    this._location.back();
  }

}
