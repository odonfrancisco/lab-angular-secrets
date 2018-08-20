import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class SessionService {
  constructor(
    private http: Http
  ) { }

  handleError(e) {
    return Observable.throw(e.json().message);
  }

  signup(user){
    return this.http.post(`${environment.BASE_URL}/signup`, user)
      .pipe(
        map(res => {
          res.json();
          this.login(user)
        }),
        catchError(this.handleError)
    )
  }

  login(user) {
    return this.http.post(`${environment.BASE_URL}/login`, user)
      .pipe(
        map(res => res.json()),
        catchError(this.handleError)
    )
  }

  isLogged() {
    return this.http.get(`${environment.BASE_URL}/loggedin`)
      .pipe(
        map(res => res.json()),
        catchError(this.handleError)
    )
  }

  logout() {
    return this.http.post(`${environment.BASE_URL}/logout`, null)
      .pipe(
        map(res => res.json()),
        catchError(this.handleError)
      )
  }
  
}
