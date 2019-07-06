import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Inscription } from '../models/inscription.model';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {


constructor(private http: HttpClient) { }

public getAllInscriptions(): Observable<Inscription[]> {
  return this.http.get<Inscription[]>(`${environment.baseUrl}/inscriptions/all`)
  .pipe(catchError((error: any) => throwError(error.json())));
}
public createInscription(inscription: Inscription): Observable<Inscription> {
  return this.http
    .post<Inscription>(`${environment.baseUrl}/inscription/add`, inscription, {withCredentials: true})
    .pipe(catchError((error: any) => throwError(error.json())));
}

}
