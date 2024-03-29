import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Login } from '../models/login.model';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Person } from '../models/person.model';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  public payload: string;
  private params: HttpParams;

  constructor(private http: HttpClient) { }

  public getConnection(login: string, password: string): Observable<Person> {
    this.params = new HttpParams().set('btoa', btoa(`${login}:${password}`));
    this.params.set('observe', 'response');
    return this.http.post<Person>(`${environment.baseUrl}/connection`, this.params,
      { withCredentials: true });
  }

  public closeConnection() {

    return this.http.get(`${environment.baseUrl}/logout`,
      { withCredentials: true })
      .pipe(catchError((error: any) => throwError(error.json())));
  }
}
