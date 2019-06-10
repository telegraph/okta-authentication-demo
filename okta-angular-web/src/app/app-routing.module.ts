import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OktaCallbackComponent, OktaAuthGuard } from '@okta/okta-angular';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { GroupsComponent } from './pages/groups/groups.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ApiCallComponent } from './pages/api-call/api-call.component';
 
export const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'implicit/callback',
    component: OktaCallbackComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'groups',
    component: GroupsComponent,
    canActivate: [ OktaAuthGuard ],
    // data: {
    //   onAuthRequired
    // }
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [ OktaAuthGuard ]
  },
  {
    path: 'api',
    component: ApiCallComponent,
    canActivate: [ OktaAuthGuard ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }