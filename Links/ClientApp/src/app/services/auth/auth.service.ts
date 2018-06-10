import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
//import { Observable } from 'rxjs/Observable';
//import { Adal5HTTPService, Adal5Service } from 'adal-angular5';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6'
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user = null;
  // 'domain': 'bharatpetroleum.onmicrosoft.com',
  // 'instance': 'https://login.microsoftonline.com/',
  // 'callbackPath': '/signin-oidc',
  // 'appIDURL': 'https://bharatpetroleum.onmicrosoft.com/iLinks'  
  private _config = {
    'tenant': '222f3a7c-d45e-4818-9aa4-33d44420ec32',
    'clientId': '69283aab-51de-414d-958b-22923a9c22d9',
    'redirectUri': 'https://localhost:44349/auth-callback',
    'postLogoutRedirectUri': 'https://localhost:44349'
  }
  //constructor(private _adal: Adal5Service) {
  constructor(private _adal: MsAdalAngular6Service) {

    //this._adal.init(this._config);
    this._user
  }

  //public isLoggedIn(): boolean {
  //  return this._adal.userInfo.authenticated;
  //}

  //public signOut(): void {
  //  this._adal.logOut();
  //}

  //public startAuthentication(): any {
  //  this._adal.login();
  //}

  public getName(): string {
    return this._adal.userInfo.userName;
  }

  //public completeAuthentication(): void {
  //  this._adal.handleWindowCallback();
  //  this._adal.getUser().subscribe(u => {
  //    this._user = u;
  //    console.log('User', u);
  //    const expireIn = u.profile.exp - new Date().getTime();
  //    console.log('Expire in:', expireIn);
  //  })
  //}
}
