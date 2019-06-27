import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActivitiesComponent } from 'src/app/Components/activities/activities.component';
import { ActivitiesService } from './services/activities.service';

@NgModule({
  declarations: [
    AppComponent,
    ActivitiesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    ActivitiesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
