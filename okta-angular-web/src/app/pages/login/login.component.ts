import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart} from '@angular/router';

import { OktaAuthService } from '@okta/okta-angular';
import * as OktaSignIn from '@okta/okta-signin-widget';
import { clientConfig } from '../../utils/oktaConfig'

@Component({
  selector: 'app-secure',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signIn;
  widget = new OktaSignIn({
    baseUrl: clientConfig.baseUrl
  });

  constructor(oktaAuth: OktaAuthService, router: Router) { 
    this.signIn = oktaAuth;

    //Show widget when prompet, otherwise remove it from the DOM
    router.events.forEach( event => {
      if(event instanceof NavigationStart) {
        switch(event.url){
          case '/login':
            break;
          case '/protected':
            break;
          default:
            this.widget.remove;
            break;
        }
      }
    });
  }

  ngOnInit() {
    this.widget.renderEl({
      el: '#okta-signin-container' },
      (res) => {
        if(res.status === 'SUCCESS'){
          this.signIn.loginRedirect('/', { sessionToken: res.session.token });
          this.widget.hide;
        }
      },
      (err) => {
        throw err;
      }
    );
  }

}
