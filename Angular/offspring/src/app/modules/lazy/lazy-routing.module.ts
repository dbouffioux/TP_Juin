import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LazyComponent} from './lazy.component';
import {CommonModule} from '@angular/common';

const routes: Routes = [
  {path: '', component: LazyComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class LazyRoutingModule { }
