import { Activity } from './activity.model';

export class Inscription {
  id?: number;
  personId?: number;
  activityId?: number;
  activity?: Activity;

  public constructor() {
    this.personId = null;
    this.activityId = null;
  }
}
