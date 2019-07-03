import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  return this.http
  .post<Person>(`${environment.baseUrl}/person/add`, payload)
  .pipe(catchError((error: any) => throwError(error.json())));
}

}
