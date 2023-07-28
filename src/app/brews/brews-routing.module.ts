import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BreweryComponent } from './brewery/brewery.component';
import { RulesComponent } from './rules/rules.component';
import { TourComponent } from './tour/tour.component';

const routes: Routes = [
  { path: '', component: RulesComponent },
  { path: 'start', component: BreweryComponent },
  { path: 'all', component:BreweryComponent},
  { path: 'tour', component:RulesComponent},
  { path: 'tour/:tourStop', component:TourComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrewsRoutingModule { }
