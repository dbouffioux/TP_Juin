import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, VirtualTimeScheduler } from 'rxjs';
import { Activity } from '../models/activity.model';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { Person } from '../models/person.models';

@Injectable()
export class ActivitiesService {


  constructor(private http: HttpClient) { }

  public getActivities(): Observable<Activity[]> {

    return this.http.get<Activity[]>(`${environment.baseUrl}/activity/all`)
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  public createActivity(activity: Activity): Observable<Activity> {
    return this.http
      .post<Activity>(`${environment.baseUrl}/activity/add`, activity, {withCredentials: true})
      .pipe(catchError((error: any) => throwError(error.json())));
  }
  public getAllActivitiesToManage(personId: number): Observable<Activity[]> {
    return this.http
    .get<Activity[]>(`${environment.baseUrl}/activity//${personId}`,
    {withCredentials: true})
    .pipe(catchError((error: any) => throwError(error.json())));
  }

  public getActivitiesByPerson(person: Person): Observable<Activity[]> {
    return this.http.post<Activity[]>(`${environment.baseUrl}/account/listActivities`, person,
    {withCredentials: true})
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  public deleteActivity(activityId: number): Observable<boolean> {
    return this.http
    .delete<boolean>(`${environment.baseUrl}/activity/${activityId}`,
    {headers: new HttpHeaders().set('Authorization', localStorage.getItem('Authorization')),
     withCredentials: true})
    .pipe(catchError((error: any) => throwError(error.json())));
  }
}
