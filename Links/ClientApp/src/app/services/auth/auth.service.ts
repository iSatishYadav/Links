import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user = null;
  constructor(private _adal: MsAdalAngular6Service) { }

  public getName(): string {
    return this._adal.userInfo.userName;
  }
}
