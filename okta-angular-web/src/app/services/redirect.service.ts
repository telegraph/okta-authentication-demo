import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { redApiUrls } from '../utils/redApiConfig'
import { resolve, reject } from 'q';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RedirectService {

  results: String;
  loading: boolean = false;
  
  constructor(private http: HttpClient, public router: Router) {}

  getHello():Observable<any>{
    return this.http.get(redApiUrls.helloUrl, {responseType: 'text'});
  }

  getHelloAdmin( tokenId ):Observable<any>{
    var headers = this.getAuthHeaders(tokenId);
    return this.http.get( redApiUrls.helloAdminUrl, {headers: headers, responseType: 'text'} );
  }

  getHelloDev( tokenId ):Observable<any>{
    var headers = this.getAuthHeaders(tokenId);
    return this.http.get( redApiUrls.helloDevUrl, {headers: headers, responseType: 'text'} );
  }

  getData( tokenId ):Observable<any>{
    //var headers = this.getAuthHeaders(tokenId);
    return this.http.get( redApiUrls.dataUrl );
  }

  getAuthHeaders( tokenId ){

    var headers = new HttpHeaders();
      headers = headers.set('Authorization', 'Bearer ' + tokenId);
      headers = headers.set('Accept', 'application/json');
      headers = headers.set('Cache-Control', 'no-cache');
      headers = headers.set('Content-Type', 'application/json');

    return headers;

  }

}
