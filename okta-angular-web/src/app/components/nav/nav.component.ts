import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatButton, MatIcon, MatMenu } from '@angular/material';
import { SvgLogoComponent } from '../svg-logo/svg-logo.component';
import { OktaService } from 'src/app/services/okta.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent implements OnInit {

  @Output() navLogin: EventEmitter<any> = new EventEmitter();
  @Output() navLogout: EventEmitter<any> = new EventEmitter();

  constructor(
    private oktaService: OktaService
  ) {}

  ngOnInit() {
  }

  callLogin(){
    this.navLogin.emit();
  }

  callLogout(){
    this.navLogout.emit();
  }

}
