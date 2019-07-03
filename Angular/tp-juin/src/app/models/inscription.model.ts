import { Activity } from './activity.model';

export class Inscription {
  id?: number;
  person_id?: number;
  activity?: Activity;

  public constructor() {
    this.person_id = null;
    this.activity = null;
  }
  }
