import { Inscription } from './inscription.model';

export class Activity {
id?: number;
name?: string;
begin?: Date;
finish?: Date;
description?: string;
url?: string;
eventName?: string;
inscriptions?: Inscription[];

 public constructor() {
   this.name = '';
   this.begin = null;
   this.finish = null;
   this.description = '';
   this.url = '';
   this.eventName = '';
   this.inscriptions = null;
 }
}
