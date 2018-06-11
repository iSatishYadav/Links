import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Link } from '../../models/link';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';

@Injectable({
  providedIn: 'root'
})
export class LinkService {
  private _httpClient: HttpClient;
  private _baseUrl: string;
  private _token: string;

  constructor(httpClient: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private _adal: MsAdalAngular6Service
  ) {
    this._httpClient = httpClient;
    this._baseUrl = baseUrl;
    this._adal.acquireToken('https"//graph.microsoft.com')
      .subscribe((resToken: string) => {
        this._token = resToken;        
      });
  }

  getLinks() {
    const httpOpions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this._token
      })
    };    
    return this._httpClient.get<Link[]>(this._baseUrl + 'api/Links', httpOpions);    
  }

  postUrlForShortening(url: string) {
    const httpOpions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this._token
      })
    };
    console.log("Calling Shortner with");
    return this._httpClient.post<string>(this._baseUrl + '/s', url, httpOpions)
  }
}
