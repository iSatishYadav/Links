import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  canActivate(): boolean {
    //if (this._authService.isLoggedIn())
    //  return true;
    //this._authService.startAuthentication();
    //return false;
    return this._authService.getName == null;
  }
  constructor(private _authService: AuthService) { }
}
