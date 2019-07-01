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
  return this.http.get<Person[]>(`${environment.baseUrl}/TP_juin/person/all`)
  .pipe(catchError((error: any) => throwError(error.json())));
}


}
