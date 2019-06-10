import { Injectable } from '@angular/core';
import { oktaApiUrls } from '../utils/oktaConfig';
import { OktaUser } from '../models/okta.user';
import { OktaGroup } from '../models/okta.group';

@Injectable({
  providedIn: 'root'
})
export class OktaService {
  public user:OktaUser;
  public groups:OktaGroup;
  public tokenId:String;
  public isAuthenticated:boolean = false;

  constructor() { }

  getUser(){
    var xhr = new XMLHttpRequest();
    var self = this;
    if ("withCredentials" in xhr) {
      xhr.onerror = function() {
        console.error('Invalid URL or Cross-Origin Request Blocked.  You must explicitly add this site (' + window.location.origin + ') to the list of allowed websites in the administrator UI');
      }
      xhr.onload = function(){
        self.user = JSON.parse( this.response );
      }
      xhr.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
          var response = JSON.parse(this.responseText);
          console.log("json Parse: ", response);
          console.log("id: ", response.id);
        }
      }
      xhr.open('GET', oktaApiUrls.meUrl, true); 
      xhr.withCredentials = true;
      xhr.send();
  } else {
      console.error("CORS is not supported for this browser!")
  }
}

getUserGroups(){
  var xhr = new XMLHttpRequest();
  var self = this;
  if ("withCredentials" in xhr) {
    xhr.onerror = function() {
      console.error('Invalid URL or Cross-Origin Request Blocked.  You must explicitly add this site (' + window.location.origin + ') to the list of allowed websites in the administrator UI');
    }
    xhr.onload = function(){
      self.groups = JSON.parse( this.response );
    }
    xhr.onreadystatechange = function() {
      if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
        console.log("json Parse Groups: ", response);
      }
    }
    xhr.open('GET', oktaApiUrls.myGroupsUrl, true);
    xhr.withCredentials = true;
    xhr.send();
    } else {
        console.error("CORS is not supported for this browser!")
    }
}

getToken( oktaAuth ){
  oktaAuth.getAccessToken();
    oktaAuth.getAccessToken().then(    
      (accessTokenId) => {
        this.tokenId = accessTokenId;
        // console.log( "Token ID: " + this.tokenId );
        }
    );
  if( oktaAuth != "" && oktaAuth != null )
        this.isAuthenticated = true;
}

logout(){
  this.isAuthenticated = false;
  this.tokenId = "";
}

}
