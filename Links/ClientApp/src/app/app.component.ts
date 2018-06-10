import { Component } from '@angular/core';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(private _adal: MsAdalAngular6Service) {
    console.log(this._adal.userInfo);
    var token = this._adal.acquireToken('https"//graph.microsoft.com')
      .subscribe((token: string) => {
        console.log(token);
      });
  }
}
