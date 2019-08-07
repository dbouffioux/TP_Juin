import { NgModule } from '@angular/core';
import {LazyComponent} from './lazy.component';
import {CommonModule} from '@angular/common';
import {LazyRoutingModule} from './lazy-routing.module';

@NgModule({
  declarations: [
    LazyComponent
  ],
  imports: [
    CommonModule,
    LazyRoutingModule
  ],
  providers: []
})
export class LazyModule {}
