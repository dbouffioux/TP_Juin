import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpParams } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActivitiesComponent } from 'src/app/Components/activities/activities.component';
import { ActivitiesService } from './services/activities.service';
import { PersonComponent } from './Components/person/person.component';
import { PersonService } from './services/person.service';
import { EventComponent } from './Components/event/event.component';
import { EventService } from './services/event.service';
import { InscriptionComponent } from './Components/inscription/inscription.component';
import { InscriptionService } from './services/inscription.service';
import { ActivityFormComponent } from './Components/activity-form/activity-form.component';
import { FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { PersonFormComponent } from './Components/person-form/person-form.component';
import { EventFormComponent } from './Components/event-form/event-form.component';
import { InscriptionFormComponent } from './Components/inscription-form/inscription-form.component';
import { HomeComponent } from './Pages/home/home.component';
import { EventItemComponent } from './Components/event-item/event-item.component';
import { LoginComponent } from './Components/login/login.component';
import { LoginService } from './services/login.service';

@NgModule({
  declarations: [
    AppComponent,
    ActivitiesComponent,
    PersonComponent,
    EventComponent,
    InscriptionComponent,
    ActivityFormComponent,
    PersonFormComponent,
    EventFormComponent,
    InscriptionFormComponent,
    HomeComponent,
    EventItemComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ActivitiesService,
    PersonService,
    EventService,
    InscriptionService,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
