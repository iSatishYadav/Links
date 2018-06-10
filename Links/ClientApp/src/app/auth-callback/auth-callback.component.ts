import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
//import { setTimeout } from 'timers';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.css']
})
export class AuthCallbackComponent implements OnInit {

  constructor(private _router: Router,
    private _authService: AuthService, private _zone: NgZone,
    private _activatedRout: ActivatedRoute
  ) { }

  ngOnInit() {
    //this._authService.completeAuthentication();

    setTimeout(() => {
      this._zone.run(
        () => this._router.navigate(['/shortner'])
      );
    }, 200);
  }

}
