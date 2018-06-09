import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Link } from '../../models/link';

@Injectable({
  providedIn: 'root'
})
export class LinkService {
  private _httpClient: HttpClient;
  private _baseUrl: string;

  constructor(httpClient: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this._httpClient = httpClient;
    this._baseUrl = baseUrl;
  }

  getLinks() {
    return this._httpClient.get<Link[]>(this._baseUrl + 'api/Links');
    //.subscribe(result => {
    //  this.links = result;
    //  console.log("links", result);
    //}, error => console.error(error));
  }

  postUrlForShortening(url: string) {
    const httpOprions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept' : 'application/json'
      })
    };
    return this._httpClient.post<string>(this._baseUrl + '/s', url, httpOprions)
  }
}
