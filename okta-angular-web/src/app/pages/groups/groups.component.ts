import { Component, OnInit, Inject } from '@angular/core';
import { RedirectService } from 'src/app/services/redirect.service';
import { OktaService } from 'src/app/services/okta.service';

@Component({
  selector: 'groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit{

  constructor(
    private redService: RedirectService,
    private oktaService: OktaService
    ){}

  async ngOnChanges(){}

  async ngOnInit(){}

}