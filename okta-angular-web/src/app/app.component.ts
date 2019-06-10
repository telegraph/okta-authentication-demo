import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';
import { RedirectService } from './services/redirect.service';
import { OktaService } from './services/okta.service';
import { RedirectNode } from './models/redirect.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {

  isAuthenticated: boolean;
  accessTokenId: String;

  constructor(
    private oktaAuth: OktaAuthService,
    private redService: RedirectService,
    private oktaService: OktaService,
    private router: Router )
    {
      this.oktaAuth.$authenticationState.subscribe(
        (isAuthenticated: boolean)  => {
          this.isAuthenticated = isAuthenticated;
          if(isAuthenticated){
            this.oktaService.getToken( this.oktaAuth );
            this.oktaService.getUser();
            this.oktaService.getUserGroups();
          }
        }
      );
    }

  async ngOnInit() {
    // Get the authentication state for immediate use
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
    //console.log("autenticated: ", await this.oktaAuth.isAuthenticated());
    if(this.isAuthenticated){
      this.oktaService.getToken( this.oktaAuth );
      this.oktaService.getUser();
      this.oktaService.getUserGroups();
    }
  }

  login() {
    this.oktaAuth.loginRedirect('/api');
  }

  async logout() {
    // Terminates the session with Okta and removes current tokens.
    await this.oktaAuth.logout();
    this.oktaService.logout();
    this.router.navigateByUrl('/');
  }

}