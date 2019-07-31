import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  return this.http.get<Event[]>(`${environment.baseUrl}/events/all`, {withCredentials: true})
  .pipe(catchError((error: any) => throwError(error.json())));
}

public getEventWithAllActivitiesById(id: number): Observable<Event> {
  return this.http.get<Event>(`${environment.baseUrl}/event/${id}`, {withCredentials: true})
    .pipe(catchError((error: any) => throwError(error.json())));
}
public getEventByPersonId(id: number): Observable<Event[]> {
  console.log(id);

  return this.http.post<Event[]>(`${environment.baseUrl}/eventsByPersonId`, {person_id: id},
  {
    withCredentials: true,
    headers: new HttpHeaders().set('Authorization', localStorage.getItem('Authorization'))})
  .pipe(catchError((error: any) => throwError(error.json())));
}

public createEvent(event: Event): Observable<Event> {
  return this.http
  .post<Event>(`${environment.baseUrl}/event/add`, event, {withCredentials: true})
  .pipe(catchError((error: any) => throwError(error.json())));
}

public deleteEvent(personId: number): Observable<boolean> {
  console.log('dans le service de suppression d ev ' +  localStorage.getItem('Authorization') + 'nb : ' + personId);
  return this.http
  .delete<boolean>(`${environment.baseUrl}/event/${personId}`,
  {headers: new HttpHeaders().set('Authorization',
  localStorage.getItem('Authorization')),
  withCredentials: true});
  //.pipe(catchError((error: any) => throwError(error.json())));
}

}
