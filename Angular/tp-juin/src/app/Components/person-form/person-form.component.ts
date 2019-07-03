import { Component, OnInit , Input, Output, EventEmitter } from '@angular/core';
import { Person } from 'src/app/models/person.models';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent implements OnInit {

  @Input()
  public person: Person;
  @Output()
  private create = new EventEmitter<Person>();

  constructor() { }

  ngOnInit() {
  }

  public createPerson() {
    console.log(this.person);
    this.create.emit(this.person);
  }
}
