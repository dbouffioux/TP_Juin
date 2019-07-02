import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

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
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ActivitiesComponent,
    PersonComponent,
    EventComponent,
    InscriptionComponent,
    ActivityFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    ActivitiesService,
    PersonService,
    EventService,
    InscriptionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
