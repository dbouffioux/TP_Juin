import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Activity } from '../models/activity.model';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ActivitiesService {


  constructor(private http: HttpClient) { }

  public getActivities(): Observable<Activity[]> {

    return this.http.get<Activity[]>(`${environment.baseUrl}/activity/all`)
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  public createActivity(payload: Activity): Observable<Activity> {
    return this.http
    .post<Activity>(`${environment.baseUrl}/activity/add`, payload)
    .pipe(catchError((error: any) => throwError(error.json())));
  }

}
