import { Component, OnInit, NgModule } from '@angular/core';
import { OktaService } from 'src/app/services/okta.service';
import { RedirectService } from 'src/app/services/redirect.service';

@Component({
  selector: 'api-call',
  templateUrl: './api-call.component.html',
  styleUrls: ['./api-call.component.scss']
})

export class ApiCallComponent implements OnInit {

  reply:String = "";
  checkErr:Boolean = true;

  constructor(
    private redService: RedirectService,
    private oktaService: OktaService
  ) {}

  ngOnInit() {
  }

  getHello(){
    this.redService.getHello().subscribe(
      data=>{
        this.reply = data;
        this.checkErr = false;
      },
      err => {
        let error = JSON.parse(err.error);
        this.reply = "ERROR " + error.status + ": " + error.message + " " + error.path;
        //this.reply = err.message;
        this.checkErr = true;
      }
      );
  }

  getHelloAdmin(){
    this.redService.getHelloAdmin( this.oktaService.tokenId ).subscribe(
      data => {
        this.reply = data;
        this.checkErr = false;
      },
      err => {
        let error = JSON.parse(err.error);
        this.reply = "ERROR " + error.status + ": " + error.message + " " + error.path;
        //this.reply = err.message;
        this.checkErr = true;
      }
      );
  }

  getHelloDeveloper(){
    this.redService.getHelloDev( this.oktaService.tokenId ).subscribe(
      data => {
        this.reply = data;
        this.checkErr = false;
      },
      err => {
        let error = JSON.parse(err.error);
        this.reply = "ERROR " + error.status + ": " + error.message + " " + error.path;
        //this.reply = err.message;
        this.checkErr = true;
      }
      );
  }

}
