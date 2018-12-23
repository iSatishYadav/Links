import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Log } from '../../models/log';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  constructor(private _httpClient: HttpClient,
    @Inject('BASE_URL') private _baseUrl: string) { }

  getLogs(id: number) {
    const httpOpions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    };
    return this._httpClient.get<Log[]>(this._baseUrl + 'api/Log/' + id, httpOpions);
  }

}
