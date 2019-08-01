import { Component, OnInit, Output, Input } from '@angular/core';
import { ActivitiesService } from 'src/app/services/activities.service';
import { Activity } from 'src/app/models/activity.model';
import { Person } from 'src/app/models/person.models';
import { Inscription } from 'src/app/models/inscription.model';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-account-container',
  templateUrl: './account-container.component.html',
  styleUrls: ['./account-container.component.css']
})

export class AccountContainerComponent implements OnInit {

  public activities: Activity[];
  public activity: Activity;
  public person: Person;

  constructor(
    private activitiesService: ActivitiesService,
    private authService: AuthenticationService) {
      this.activity = new Activity();
  }

  ngOnInit() {
    this.person = this.authService.getPerson();
    this.initActivities();
  }

  public initActivities() {
    this.activitiesService.getAllActivitiesToManage(this.person.id).subscribe(
      activities => { this.activities = activities; }
    );
  }

  public createActivity(activity: Activity) {
   this.activitiesService.createActivity(activity).subscribe(
    () => { this.initActivities(); },
    error => {
      console.log(error);
    });
  }
}

