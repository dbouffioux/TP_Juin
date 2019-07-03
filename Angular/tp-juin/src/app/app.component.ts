import { Component } from '@angular/core';
import { Activity } from './models/activity.model';
import { ActivitiesService } from './services/activities.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tp-juin';
}
