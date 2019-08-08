import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpParams } from '@angular/common/http';
import { FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActivitiesService } from './services/activities.service';
import { PersonsService } from './services/persons.service';
import { EventsService } from './services/events.service';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { InscriptionsService } from './services/inscriptions.service';
import { ActivityFormComponent } from './components/activity-form/activity-form.component';
import { EventFormComponent } from './components/event-form/event-form.component';
import { LoginComponent } from './components/login/login.component';
import { LoginService } from './services/login.service';
import { UpdateAccountComponent } from './components/updateAccount/updateAccount.component';
import { MenuContainerComponent } from './containers/menu-container/menu-container.component';
import { AuthenticationsService } from './services/authentications.service';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ActivityListComponent } from './components/activity-list/activity-list.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import { AccountContainerComponent } from './containers/account-container/account-container.component';
import { HomeContainerComponent } from './containers/home-container/home-container.component';
import { ActivityItemComponent } from './components/activity-item/activity-item.component';
import { AccountFormComponent } from './components/account-form/account-form.component';
import { ControlMessagesComponent } from './utils/control-message.component';

@NgModule({
  declarations: [
    AppComponent,
    EventListComponent,
    InscriptionComponent,
    ActivityFormComponent,
    EventFormComponent,
    LoginComponent,
    UpdateAccountComponent,
    MenuContainerComponent,
    LoginFormComponent,
    ActivityListComponent,
    ProfileFormComponent,
    AccountContainerComponent,
    HomeContainerComponent,
    ActivityItemComponent,
    AccountFormComponent,
    ActivityFormComponent,
    ControlMessagesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  providers: [
    ActivitiesService,
    PersonsService,
    EventsService,
    InscriptionsService,
    LoginService,
    AuthenticationsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
