import {  OnInit, Component } from '@angular/core';
import { ActivitiesService } from 'src/app/services/activities.service';
import { Activity } from 'src/app/models/activity.model';
import { ActivityFormComponent } from '../activity-form/activity-form.component';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {

  public activities: Activity[];

  public activity: Activity ;


  constructor(private activitiesServices: ActivitiesService) {  this.activity = new Activity(); }

  ngOnInit() {
    this.activitiesServices.getActivities().subscribe(activities => this.activities = activities);
  }
  public onCreate(event: Activity) {
    this.activitiesServices.createActivity(event).subscribe(() => {
      console.log('OK');
    }, error => {
      console.log(error);
    });
  }

}
