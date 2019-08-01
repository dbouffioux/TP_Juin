import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.css']
})

export class HomeContainerComponent implements OnInit {

  constructor(
    private eventService: EventService,) { }

  ngOnInit() {
  }

}
