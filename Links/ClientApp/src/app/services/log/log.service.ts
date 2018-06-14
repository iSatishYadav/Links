import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';
import { Log } from '../../models/log';

@Injectable({
  providedIn: 'root'
})
export class LogService {
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

  getLogs(id: number) {
    const httpOpions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this._token
      })
    };
    return this._httpClient.get<Log[]>(this._baseUrl + 'api/Log/' + id, httpOpions);
  }

}
