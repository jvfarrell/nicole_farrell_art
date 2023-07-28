import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthGuard } from './user/auth.guard';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  {
    path: 'login',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'brew',
    loadChildren: () =>
      import('./brews/brews.module').then((m) => m.BrewsModule),
    //canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      useHash: true // stops the 404 error from happening when a user refreshes the page (since it's a single page app)
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
