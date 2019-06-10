import { Component, OnInit } from '@angular/core';
import { OktaService } from 'src/app/services/okta.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private oktaService: OktaService
  ) { }

  ngOnInit() {
  }

}
