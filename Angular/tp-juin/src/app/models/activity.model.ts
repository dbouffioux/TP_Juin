export class Activity {
id?: number;
name?: string;
begin?: Date;
finish?: Date;
description?: string;
url?: string;
event_name?: string;

 public constructor() {
   this.name = '';
   this.begin = null;
   this.finish = null;
   this.description = '';
   this.url = '';
   this.event_name = '';
 }
}
