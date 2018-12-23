import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Link } from '../../models/link';

@Injectable({
  providedIn: 'root'
})

export class LinkService {
  constructor(private _httpClient: HttpClient,
    @Inject('BASE_URL') private _baseUrl: string) { }

  getLinks() {
    const httpOpions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      })
    };
    return this._httpClient.get<Link[]>(this._baseUrl + 'api/Links', httpOpions);
  }

  postUrlForShortening(url: string) {
    const httpOpions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      })
    };
    return this._httpClient.post<string>(this._baseUrl + '/s', url, httpOpions)
  }
}
