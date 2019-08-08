import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountContainerComponent } from './containers/account-container/account-container.component';
import { HomeContainerComponent } from './containers/home-container/home-container.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeContainerComponent},
  {path: 'account', component: AccountContainerComponent},
  {path: 'lazy-load', loadChildren: './modules/lazy/lazy.module#LazyModule'},
  {path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
