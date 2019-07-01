import {  OnInit, Component } from '@angular/core';
import { ActivitiesService } from 'src/app/services/activities.service';
import { Activity } from 'src/app/models/activity.model';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {

  public activities: Activity[];

  constructor(private activitiesServices: ActivitiesService) { }

  ngOnInit() {
    this.activitiesServices.getActivities().subscribe(activities => this.activities = activities);
  }

}
