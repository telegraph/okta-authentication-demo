import { Component, OnInit } from '@angular/core';
import { UserClaims } from '@okta/okta-angular';
import { OktaAuthService } from '@okta/okta-angular';

interface Claim{
  claim: string,
  value: string
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  claims: Array<Claim>;
  userClaims: UserClaims;

  constructor(public oktaAuth: OktaAuthService) { }

  async ngOnInit() {
    this.userClaims = await this.oktaAuth.getUser();
    this.claims = Object.entries(this.userClaims).map(entry => ({ claim: entry[0], value: entry[1] }));
  }

}
