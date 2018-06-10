import { Component, OnInit, Inject } from '@angular/core';
import { Link } from '../models/link';
import { LinkService } from '../services/link/link.service';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.css']
})

export class LinksComponent implements OnInit {
  public links: Link[];
  private _linkService: LinkService;
  private _userName: string = null;

  constructor(linkService: LinkService, private _authService: AuthService) {
    this._linkService = linkService;
    linkService.getLinks()
      .subscribe(result => {
        this.links = result;
        console.log("links", result);
      }, error => console.error(error));
  }

  ngOnInit() {
    this._userName = this._authService.getName();
    console.log(this._userName);
  }

  public signOut(): void {
    //this._authService.signOut();    
  }
}
