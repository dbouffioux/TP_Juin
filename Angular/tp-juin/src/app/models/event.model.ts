import { Activity } from './activity.model';

export class Event {
  id?: number;
  name?: string;
  personId?: number;
  begin?: Date;
  finish?: Date;
  activities?: Activity[];

  public constructor() {
    this.id = null;
    this.name = '';
    this.personId = null;
    this.begin = null;
    this.finish = null;
    this.activities = null;
    }
  }
