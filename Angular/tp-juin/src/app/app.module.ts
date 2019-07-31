import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpParams } from '@angular/common/http';
import { FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActivitiesService } from './services/activities.service';
import { PersonService } from './services/person.service';
import { EventService } from './services/event.service';
import { InscriptionComponent } from './Components/inscription/inscription.component';
import { InscriptionService } from './services/inscription.service';
import { ActivityFormComponent } from './Components/activity-form/activity-form.component';
import { EventFormComponent } from './Components/event-form/event-form.component';
import { InscriptionFormComponent } from './Components/inscription-form/inscription-form.component';
import { HomeComponent } from './Pages/home/home.component';
import { EventItemComponent } from './Components/event-item/event-item.component';
import { LoginComponent } from './Components/login/login.component';
import { LoginService } from './services/login.service';
import { AccountComponent } from './Pages/account/account.component';
import { LogoutComponent } from './Components/logout/logout.component';
import { ListActivitiesComponent } from './Pages/listActivities/listActivities.component';
import { UpdateAccountComponent } from './Pages/updateAccount/updateAccount.component';
import { MenuComponent } from './Components/menu/menu.component';
import { AuthenticationService } from './services/authentication.service';
import { UpdateActivityComponent } from './Pages/updateActivity/updateActivity.component';
import { LoginFormComponent } from './Components/login-form/login-form.component';
import { ActivityListComponent } from './components/activity-list/activity-list.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import { AccountContainerComponent } from './containers/account-container/account-container.component';
import { ActivityItemContainerComponent } from './containers/activity-item-container/activity-item-container.component';
import { HomeContainerComponent } from './containers/home-container/home-container.component';

@NgModule({
  declarations: [
    AppComponent,
    EventListComponent,
    InscriptionComponent,
    ActivityFormComponent,
    EventFormComponent,
    InscriptionFormComponent,
    HomeComponent,
    EventItemComponent,
    LoginComponent,
    AccountComponent,
    LogoutComponent,
    ListActivitiesComponent,
    UpdateAccountComponent,
    MenuComponent,
    UpdateActivityComponent,
    LoginFormComponent,
    ActivityListComponent,
    ProfileFormComponent,
    AccountContainerComponent,
    ActivityItemContainerComponent,
    HomeContainerComponent
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
    PersonService,
    EventService,
    InscriptionService,
    LoginService,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
