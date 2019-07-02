import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import { Activity } from 'src/app/models/activity.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.css']
})
export class ActivityFormComponent implements OnInit {

  public activityForm: FormGroup;

  @Input()
  public activity: Activity;
  @Output()
  private create = new EventEmitter<Activity>();

  constructor() {
    // this.activityForm=this.fb.group();
   }

  ngOnInit() {
  }
  public createActivity() {
    console.log(this.activity);

    this.create.emit(this.activity);
  }
}
