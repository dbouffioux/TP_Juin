import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Person } from '../models/person.model';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import {Status} from 'tslint/lib/runner';

@Injectable({
  providedIn: 'root'
})

export class PersonsService {

  private params: HttpParams;

  constructor(private http: HttpClient) { }

  public getPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(`${environment.baseUrl}/person/all`,
      { withCredentials: true })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  public createPerson(payload: Person): Observable<Person> {
    console.log();
    this.params = new HttpParams().set('observe', 'response');
    return this.http
      .post<Person>(`${environment.baseUrl}/person/add`, payload,
        {
          headers: new HttpHeaders().set('Authorization',
            localStorage.getItem('Authorization')),
          withCredentials: true
        })
      .pipe(catchError((error: Status) => {
        return throwError(error.valueOf());
      }));
  }

  public deleteProfile(personId: number): Observable<boolean> {
    return this.http
      .delete<boolean>(`${environment.baseUrl}/person/${personId}`,
        {
          headers: new HttpHeaders().set('Authorization', localStorage.getItem('Authorization')),
          withCredentials: true
        })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  public updatePerson(personUpdated: Person) {
    console.log('service : ', personUpdated);
    return this.http.put(`${environment.baseUrl}/person/`, personUpdated,
      {
        headers: new HttpHeaders().set('Authorization', localStorage.getItem('Authorization')),
        withCredentials: true
      })
      .pipe(catchError((error: any) => throwError(error.json())));
  }
}
