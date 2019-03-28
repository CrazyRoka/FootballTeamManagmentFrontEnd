import { Injectable } from '@angular/core';
import { User } from '../user';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from '../globals';
import { map, catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private tokenSubject: BehaviorSubject<string>;
  public currentToken: Observable<string>;

  constructor(private http: HttpClient, private notifier: NotifierService) {
    this.tokenSubject = new BehaviorSubject<string>(localStorage.getItem('authToken'));
    this.currentToken = this.tokenSubject.asObservable();
  }

  public get currentTokenValue() {
    return this.tokenSubject.value;
  }

  register(user: User) {
    return this.http.post(`${apiUrl}/users`, user);
  }

  login(email: string, password: string) {
    return this.http.post(`${apiUrl}/login`, { password, email })
      .pipe(
        map((token: any) => {
          if (token && token.bearer) {
            localStorage.setItem('authToken', token.bearer);
            this.tokenSubject.next(token.bearer);
          }
          return token;
        })
      );
  }

  logout() {
    localStorage.removeItem('authToken');
    this.tokenSubject.next(null);
  }

  changePassword(oldPassword: string, newPassword: string) {
    return this.http.put(`${apiUrl}/users/password`, { oldPassword, newPassword })
      .pipe(
        catchError(error => {
          this.notifier.notify('error', error.statusText);
          return throwError(error);
        })
      )
  }
}
