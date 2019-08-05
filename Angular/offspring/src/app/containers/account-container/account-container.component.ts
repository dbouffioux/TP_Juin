import { Component, OnInit, Output, Input } from '@angular/core';
import { ActivitiesService } from 'src/app/services/activities.service';
import { Activity } from 'src/app/models/activity.model';
import { Person } from 'src/app/models/person.model';
import { EventsService } from 'src/app/services/events.service';
import { Event } from 'src/app/models/event.model';
import { Inscription } from 'src/app/models/inscription.model';
import { AuthenticationsService } from 'src/app/services/authentications.service';
import { InscriptionsService } from 'src/app/services/inscriptions.service';
import { PersonsService } from '../../services/persons.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-container',
  templateUrl: './account-container.component.html',
  styleUrls: ['./account-container.component.scss']
})

export class AccountContainerComponent implements OnInit {

  public activities: Activity[];
  public activity: Activity;
  public person: Person;
  public persons: Person[];
  public event: Event;
  public events: Event[];
  public inscriptions: Inscription[];
  public isDeleted: boolean;
  // tabs
  public showInfoTab: boolean;
  public showAccountUpdateForm: boolean;
  public tabsStatuses: any;
  public tabActive: any;
  // event-form pop-up
  public showCreateEventPopup: boolean;
  public showActivityPopup: boolean;
  public activityToShow: Activity;
  public isManagement: boolean;
  public showCreateActivityPopup: boolean;

  constructor(
    private activitiesService: ActivitiesService,
    private eventService: EventsService,
    private authService: AuthenticationsService,
    private inscriptionService: InscriptionsService,
    private personService: PersonsService,
    private router: Router) {
    this.activity = new Activity();
    // set default tabs status
    this.showInfoTab = true;
    this.tabActive = 'info';
    this.showAccountUpdateForm = false;
    this.showCreateActivityPopup = false;
  }

  ngOnInit() {
    this.person = this.authService.getPerson();
    this.initActivities();
    this.initEvents();
    this.initInscriptions();
  }

  public initActivities() {
    this.activitiesService.getAllActivitiesToManage(this.person.id)
      .subscribe(activities => {
        this.activities = activities;
      });
  }

  public initEvents() {
    this.eventService.getEventByPersonId(this.person.id)
      .subscribe(events => {
        this.events = events;
      });
  }

  public initInscriptions() {
    this.inscriptionService.getAllInscriptionsForOnePerson(this.person.id).subscribe(inscription => {
      this.inscriptions = inscription;
    });
  }

  public createActivity(activity: Activity) {
    this.activitiesService.createActivity(activity).subscribe(() => {
      console.log('dans le oncreateActivity');
      this.initActivities();

    }, error => {
      console.log(error);
    });
  }

  public createEvent(event: Event) {
    console.log('dans container');
    console.log(event.name);
    event.personId = this.person.id;
    this.eventService.createEvent(event).subscribe(() => {
      this.initEvents();
    }, error => {
      console.log(error);
    });
  }

  public deleteEvent(eventId: number) {
    this.eventService.deleteEvent(eventId).subscribe(() => {
      this.isDeleted = true;
      this.initEvents();
      this.initActivities();
    }, error => {
      console.log(error);
    });
  }
  public deleteActivity(activity: Activity) {
    console.log('deleteActivity avant Service ' + activity);

    this.activitiesService.deleteActivity(activity.id).subscribe(() => {
      this.initActivities();
      this.isDeleted = true;
      console.log('dans le deleteActivity');
    }, error => {
      console.log(error);
    });
  }

  public deleteInscription(inscription: Inscription) {
    this.inscriptionService.deleteInscription(inscription.id).subscribe(() => {
      console.log('OK');
      this.isDeleted = true;
      this.initInscriptions();
    }, error => {
      this.isDeleted = false;
      console.log(error);
    });
  }
  public updateProfile(personUpdated: Person) {
    console.log('container  : ' + personUpdated.firstname);

    this.personService.updatePerson(personUpdated).subscribe(() => {
      console.log('OK');
      localStorage.setItem('Person', JSON.stringify(personUpdated));
    }, error => {
      console.log(error);
    });
  }

  public deleteProfile() {
    this.person = JSON.parse(localStorage.getItem('Person'));
    this.personService.deleteProfile(this.person.id).subscribe(() => {
      this.authService.logout();
      this.router.navigate(['/home']);
    }, error => {
      console.log(error);
    });
  }

  public toggleTab(tab: string) {
    this.resetTab(this.tabActive);
    // switch tab status
    switch (tab) {
      case 'info':
        this.showInfoTab = true;
        this.tabActive = tab;
        break;
      case 'account-update-form':
        this.showAccountUpdateForm = true;
        this.tabActive = tab;
        break;
    }
  }

  public resetTab(tabActive: string) {
    switch (tabActive) {
      case 'info':
        this.showInfoTab = false;
        break;
      case 'account-update-form':
        this.showAccountUpdateForm = false;
        break;
    }
  }
  public toggleActivityItem(activity: Activity) {
    this.isManagement = true;
    this.showActivityPopup = !this.showActivityPopup;
    this.activityToShow = activity;
    this.isManagement = true;
  }
  public toggleCreateEventPopup() {
    this.showCreateEventPopup = !this.showCreateEventPopup;
  }

  public toggleCreateActivityPopup() {
    this.showCreateActivityPopup = !this.showCreateActivityPopup;
  }
}