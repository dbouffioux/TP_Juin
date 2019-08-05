import { Activity } from './activity.model';

export class Event {
  id?: number;
  name?: string;
  person_id?: number;
  begin?: Date;
  finish?: Date;
  activities?: Activity[];

  public constructor() {
    this.id = null;
    this.name = '';
    this.person_id = null;
    this.begin = null;
    this.finish = null;
    this.activities = null;
    }
  }
