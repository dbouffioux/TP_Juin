import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Activity } from '../models/activity.model';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ActivitiesService {

  constructor(private http: HttpClient) { }



  public getActivities(): Observable<Activity[]> {

    return this.http.get<Activity[]>(`http://localhost:8080/festival/festival`)
      .pipe(catchError((error: any) => throwError(error.json())));
  }




}
