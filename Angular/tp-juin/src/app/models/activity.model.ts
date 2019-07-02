export class Activity {
id?: number;
name?: string;
begin?: string;
finish?: string;
description?: string;
url?: string;
event_name?: string;

 public constructor() {
   this.name = '';
   this.begin = '';
   this.finish = '';
   this.description = '';
   this.url = '';
   this.event_name = '';
 }
}
