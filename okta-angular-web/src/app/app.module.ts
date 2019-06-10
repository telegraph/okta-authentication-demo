import { oktaConfig } from './utils/oktaConfig';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { appRoutes } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { OktaAuthModule } from '@okta/okta-angular';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { GroupsComponent } from './pages/groups/groups.component';
import { NavComponent } from './components/nav/nav.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ApiCallComponent } from './pages/api-call/api-call.component';
import { SvgLogoComponent } from './components/svg-logo/svg-logo.component';
import { AgGridModule } from 'ag-grid-angular';

import { 
         MatButtonModule,
         MatCardModule,
         MatSelectModule,
         MatToolbarModule,
         MatTabsModule,
         MatIconModule,
         MatMenuModule,
         MatInputModule,
         MatExpansionModule,
        }
        from '@angular/material';

export function onAuthRequired({ oktaAuth, router }) {
  // Redirect the user to your custom login page
  router.navigate(['/login']);
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    LoginComponent,
    GroupsComponent,
    ProfileComponent,
    ApiCallComponent,
    SvgLogoComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    OktaAuthModule.initAuth(oktaConfig),
    HttpClientModule,

    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatToolbarModule,
    MatTabsModule,
    MatIconModule,
    MatMenuModule,
    MatInputModule,
    MatExpansionModule,
    
    AgGridModule.withComponents(
      [
        AppComponent
      ],
  )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
