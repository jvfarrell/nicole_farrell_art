import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadComponent } from './upload/upload.component';

const routes: Routes = [
  { path: 'upload', component: UploadComponent },
  // { path: 'start', component: BreweryComponent },
  // { path: 'all', component:BreweryComponent},
  // { path: 'tour', component:RulesComponent},
  // { path: 'tour/:tourStop', component:TourComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArtRoutingModule { }
