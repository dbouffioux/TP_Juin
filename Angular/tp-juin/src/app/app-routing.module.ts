import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { EventItemComponent } from './Components/event-item/event-item.component';
import { LoginComponent } from './Components/login/login.component';
import { ListActivitiesComponent } from './Pages/listActivities/listActivities.component';
import { InscriptionFormComponent } from './Components/inscription-form/inscription-form.component';
import { InscriptionComponent } from './Components/inscription/inscription.component';
import { UpdateAccountComponent } from './Pages/updateAccount/updateAccount.component';
import { UpdateActivityComponent } from './Pages/updateActivity/updateActivity.component';
import { ActivityListComponent } from './components/activity-list/activity-list.component';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import { AccountContainerComponent } from './containers/account-container/account-container.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'activity', component: ActivityListComponent},
  {path: 'connection', component: LoginComponent},
  {path: 'event/:id', component: EventItemComponent},
  {path: 'account', component: AccountContainerComponent},
  {path: 'account/listActivities', component: ListActivitiesComponent},
  {path: 'inscription', component: ProfileFormComponent},
  {path: 'updateAccount', component: UpdateAccountComponent},
  {path: 'updateActivity/:id', component: UpdateActivityComponent},
  {path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
