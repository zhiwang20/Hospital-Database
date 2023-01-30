
import { shareReplay, tap, concatMap, switchMap, filter, reduce } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';




import jwtDecode from 'jwt-decode';
import * as moment from 'moment';
import { environment } from '../../environments/environment';
import { BehaviorSubject, of } from 'rxjs';

@Injectable()
export class AuthService {
  baseURL = environment.baseURL;
  private user: any;
  private loggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _authRole;
  private _tempStore: any;
  constructor(
    private http: HttpClient,
  ) { }

  get isLoggedIn$() {
    return this.loggedInSubject.asObservable();
  }

  private _session(resp) {
    const decoded = jwtDecode(resp.token);
    const expiresAt = decoded.exp;
    this._authRole = decoded.hasOwnProperty('auth_role') ? decoded.auth_role : 'user';
    localStorage.setItem('auth_token', resp.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt));
    this.isLoggedIn();
  }

  private _getExpiration() {
    const seconds = localStorage.getItem('expires_at');
    const user = localStorage.getItem('___local_user');
    this.user = JSON.parse(user);
    const expiresAt = seconds ? JSON.parse(seconds) : 0;
    return moment.unix(expiresAt);
  }

  role() {
    if (this._authRole) {
      return this._authRole;
    } else {
      const encoded = localStorage.getItem('auth_token');
      const decoded = jwtDecode(encoded);
      this._authRole = decoded.hasOwnProperty('auth_role') ? decoded.auth_role : 'user';
      return this._authRole;
    }
  }

  storeUser(user: any, email: string) {
    this.user = { ...user, email };
    localStorage.setItem('___local_user', JSON.stringify(this.user));
  }

  getme(tokenObj: any) {
    const decoded = jwtDecode(tokenObj.token);
    const id = decoded.id;
    return this.http.get(`${this.baseURL}/api/v1/users/me`).pipe(
      tap(res => this.storeUser(res, decoded.email))
    );
  }

  me() {
    return of(JSON.parse(JSON.stringify(this.user)));
  }

  checkExist(email: string) {
    return this.http.post(`${this.baseURL}/api/users/check-exist`, { email });
  }

  createUser({ email, username, password }) {
    return this.http.post(`${this.baseURL}/api/users/createforapp`, { email, username, password});
  }

  tempStore(tokenObj: any) {
    this._tempStore = tokenObj;
    localStorage.setItem('auth_token', tokenObj.token);
  }

  login(email: string, password: string) {
    return this.http.post(`${this.baseURL}/auth/login`, { email, password}).pipe(
      tap(res => this.tempStore(res)),
      concatMap(resp => this.getme(resp)),
      tap(_ => this._session(this._tempStore)),
      shareReplay());
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('___local_user');
    this.loggedInSubject.next(false);
  }

  isLoggedIn() {
    const isAuthenticaed = moment().isBefore(this._getExpiration());
    console.log(`Is authenticated ${isAuthenticaed}`);
    this.loggedInSubject.next(isAuthenticaed);
    return isAuthenticaed;
  }

  forgotPassword(payload: any) {
    return this.http.post(`${this.baseURL}/api/users/forgotPassword`, payload);
  }

  resetPassword(payload: any) {
    return this.http.post(`${this.baseURL}/api/users/resetPassword`, payload);
  }
}
