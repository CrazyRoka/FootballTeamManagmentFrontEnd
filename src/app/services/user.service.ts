import { Injectable } from '@angular/core';
import { User } from '../user';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from '../globals';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private tokenSubject: BehaviorSubject<string>;
  public currentToken: Observable<string>;

  constructor(private http: HttpClient) {
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
}
