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
  public showEventPopup: boolean;
  public showActivityPopup: boolean;
  public activityToShow: Activity;
  public isManagement: boolean;
  public showCreateActivityPopup: boolean;
  private showSubscriptions: boolean;
  private showConfirmDelete: boolean;
  public activeEventId: number;

  constructor(
    private activitiesService: ActivitiesService,
    private eventService: EventsService,
    private authService: AuthenticationsService,
    private inscriptionService: InscriptionsService,
    private personService: PersonsService,
    private router: Router) {
    this.activity = new Activity();
    // set default tabs status
    this.showSubscriptions = true;
    this.tabActive = 'subscription-list';
    this.showAccountUpdateForm = false;
    this.showCreateActivityPopup = false;
    this.showEventPopup = false;
  }

  ngOnInit() {
    this.person = this.authService.getPerson();
    this.initEvents();
    this.initInscriptions();
    this.activeEventId = null;
  }

  public initActivitiesList(eventName: string) {
    this.activities = [];
    this.eventService.getEventWithAllActivitiesByName(eventName).subscribe(event => {
      event.activities.map(activity => {
        this.activities.push(activity);
        this.activeEventId = event.id;
      });
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
    }, error => {
      console.log(error);
    });
  }

  public createEvent(event: Event) {
    event.personId = this.person.id;
    this.eventService.createEvent(event).subscribe(() => {
      this.initEvents();
      this.toggleEventPopup();
    }, error => {
      console.log(error);
    });
  }

  public deleteEvent(eventId: number) {
    this.eventService.deleteEvent(eventId).subscribe(() => {
      this.activities = [];
      this.isDeleted = true;
      this.initEvents();
    }, error => {
      console.log(error);
    });
  }

  public updateEvent(event: Event) {
    this.eventService.updateEvent(event).subscribe(() => {
      this.initEvents();
      this.toggleEventPopup();
    }, error => {
      console.log(error);
    });
  }

  public updateActivity(activity: Activity) {
    this.activitiesService.updateActivity(activity).subscribe(() => {
      this.initActivitiesList(activity.eventName);
    }, error => {
      console.log(error);
    });
  }

  public deleteActivity(activity: Activity) {
    this.activitiesService.deleteActivity(activity.id).subscribe(() => {
      this.initActivitiesList(activity.eventName);
    }, error => {
      console.log(error);
    });
  }

  public deleteInscription(inscription: Inscription) {
    this.inscriptionService.deleteInscription(inscription.id).subscribe(() => {
      this.isDeleted = true;
      this.initInscriptions();
    }, error => {
      this.isDeleted = false;
    });
  }
  public updateProfile(personUpdated: Person) {
    this.personService.updatePerson(personUpdated).subscribe(() => {
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
    this.tabActive = tab;
    // switch tab status
    switch (tab) {
      case 'info':
        this.showInfoTab = true;
        break;
      case 'account-update-form':
        this.showAccountUpdateForm = true;
        break;
      case 'subscription-list':
        this.showSubscriptions = true;
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
      case 'subscription-list':
        this.showSubscriptions = false;
        break;
    }
  }

  public toggleActivityItem(activity: Activity) {
    this.isManagement = true;
    this.showActivityPopup = !this.showActivityPopup;
    this.activityToShow = activity;
    this.isManagement = true;
  }

  public toggleEventPopup(name?: string) {
    if (name !== undefined) {
      this.eventService.getEventWithAllActivitiesByName(name).subscribe(
        event => {
          this.event = event;
          this.showEventPopup = !this.showEventPopup;
        }
      );
    } else {
      this.event = new Event();
      this.showEventPopup = !this.showEventPopup;
    }
  }

  public toggleCreateActivityPopup() {
    this.showCreateActivityPopup = !this.showCreateActivityPopup;
  }
  public toggleConfirmDelete() {
    this.showConfirmDelete = !this.showConfirmDelete;
  }
}
