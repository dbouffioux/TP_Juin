import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { Event } from 'src/app/models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {

constructor(private http: HttpClient) { }

public getAllEvents(): Observable<Event[]> {
  return this.http.get<Event[]>(`${environment.baseUrl}/TP_juin/events/all`)
  .pipe(catchError((error: any) => throwError(error.json())));
}
}
