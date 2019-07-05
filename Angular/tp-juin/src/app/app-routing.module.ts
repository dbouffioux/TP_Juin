import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { ActivitiesComponent } from './Components/activities/activities.component';
import { EventItemComponent } from './Components/event-item/event-item.component';
import { LoginComponent } from './Components/login/login.component';
import { AccountComponent } from './Pages/account/account.component';
import { ListActivitiesComponent } from './Pages/listActivities/listActivities.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'activity', component: ActivitiesComponent},
  {path: 'connection', component: LoginComponent},
  {path: 'event/:id', component: EventItemComponent},
  {path: 'account', component: AccountComponent},
  {path: 'account/listActivities', component: ListActivitiesComponent},
  {path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
