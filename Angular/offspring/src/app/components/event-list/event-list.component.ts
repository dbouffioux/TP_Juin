import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Event } from 'src/app/models/event.model';
import { Person } from 'src/app/models/person.model';


@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})

export class EventListComponent implements OnInit {

  public event: Event;
  public person: Person;
  public showCreateEventPopup: boolean;
  @Input() public events: Event[];
  @Input() public isManagement: boolean;
  @Output() private delete = new EventEmitter<number>();
  @Output() private update = new EventEmitter<string>();
  @Output() private create = new EventEmitter<Event>();
  @Output() private getActivityList = new EventEmitter<string>();
  @Input() public activeEventId: number;

  constructor() {
    this.event = new Event();
  }

  ngOnInit() {

  }

  public onCreate(event: Event) {
    this.create.emit(event);
  }

  public getActivities(eventName: string) {
    this.getActivityList.emit(eventName);
  }

  public onDelete(id: number) {
    this.delete.emit(id);
  }

  public onUpdate(name: string) {
    this.update.emit(name);
  }

  public toggleShowCreateEventPopup() {
    this.showCreateEventPopup = !this.showCreateEventPopup;
  }
}
