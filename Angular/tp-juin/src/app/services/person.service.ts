import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Person } from '../models/person.models';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class PersonService {

constructor(private http: HttpClient) { }

  public getPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(`${environment.baseUrl}/person/all`)
    .pipe(catchError((error: any) => throwError(error.json())));
  }

  public createPerson(payload: Person): Observable<Person> {
    console.log();

    return this.http
    .post<Person>(`${environment.baseUrl}/person/add`, payload,
    {headers: new HttpHeaders().set('Authorization',
    localStorage.getItem('Authorization')),
    withCredentials: true})
    .pipe(catchError((error: any) => throwError(error.json())));
  }

  public deleteProfile(personId: number): Observable<boolean> {
    return this.http
    .delete<boolean>(`${environment.baseUrl}/person/${personId}`,
    {headers: new HttpHeaders().set('Authorization', localStorage.getItem('Authorization')),
    withCredentials: true})
    .pipe(catchError((error: any) => throwError(error.json())));
  }

  public updatePerson(personUpdated: Person) {
    console.log(personUpdated);

    return this.http.put(`${environment.baseUrl}/person/${personUpdated.id}`, personUpdated,
    {headers: new HttpHeaders().set('Authorization', localStorage.getItem('Authorization')),
    withCredentials: true})
    .pipe(catchError((error: any) => throwError(error.json())));
  }
}
