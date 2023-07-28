import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrewsRoutingModule } from './brews-routing.module';
import { BreweryComponent } from './brewery/brewery.component';
import { RulesComponent } from './rules/rules.component';
import { SharedModule } from '../shared/shared.module';
import { TourComponent } from './tour/tour.component';


@NgModule({
  declarations: [
    BreweryComponent,
    RulesComponent,
    TourComponent
  ],
  imports: [
    CommonModule,
    BrewsRoutingModule,
    SharedModule
  ]
})
export class BrewsModule { }
