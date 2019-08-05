import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventItemComponent } from './Components/event-item/event-item.component';
import { LoginComponent } from './Components/login/login.component';
import { ActivityListComponent } from './components/activity-list/activity-list.component';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import { AccountContainerComponent } from './containers/account-container/account-container.component';
import { HomeContainerComponent } from './containers/home-container/home-container.component';
import { UpdateAccountComponent } from './components/updateAccount/updateAccount.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeContainerComponent},
  {path: 'activity', component: ActivityListComponent},
  {path: 'connection', component: LoginComponent},
  {path: 'event/:id', component: EventItemComponent},
  {path: 'account', component: AccountContainerComponent},
  {path: 'inscription', component: ProfileFormComponent},
  {path: 'updateAccount', component: UpdateAccountComponent},
  {path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
