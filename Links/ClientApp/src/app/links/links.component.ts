import { Component, OnInit, Inject } from '@angular/core';
import { Link } from '../models/link';
import { LinkService } from '../services/link/link.service';
import { BroadcastService } from '@azure/msal-angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.css']
})

export class LinksComponent implements OnInit {
  public links: Link[];
  private _linkService: LinkService;
  private _userName: string = null;
  selectedLink: Link;
  public linkWiseCountLabels: string[];
  public linkWiseCounts: number[];

  private subscriptions: Subscription[];
  constructor(linkService: LinkService, private broadcastService: BroadcastService) {
    this._linkService = linkService;
    this.subscriptions = new Array<Subscription>();
    //linkService.getLinks()
    //  .subscribe(result => {
    //    this.links = result;
    //    this.linkWiseCountLabels = this.links.map(x => x.originalLink);        
    //    this.linkWiseCounts = this.links.map(x => x.clicks || 0);       
    //  }, error => console.error(error));
    this.subscriptions.push(this.broadcastService.subscribe("msal:loginFailure", (payload) => {
      console.log("loginFailure", payload);
    }));

    this.subscriptions.push(this.broadcastService.subscribe("msal:loginSuccess", (payload) => {
      // do something here
      console.log("loginSuccess", payload);
    }));

    this.subscriptions.push(this.broadcastService.subscribe("msal:acquireTokenSuccess", (payload) => {
      // do something here
      console.log("acquireTokenSuccess", payload);
    }));

    this.subscriptions.push(this.broadcastService.subscribe("msal:acquireTokenFailure", (payload) => {
      // do something here
      console.log("acquireTokenFailure", payload);
    }));
  }



  ngOnDestroy() {
    this.broadcastService.getMSALSubject().next(1);
    this.subscriptions.forEach((value, index) => {
      if (value) {
        value.unsubscribe();
      }
    })
  }

  onSelect(link: Link): void {
    this.selectedLink = link;
  }

  shortLinkClicked(link: Link): void {
    link.clicks++;
  }
  ngOnInit() {
    //this._userName = this._authService.getName();
    this._linkService.getLinks()
      .subscribe(result => {
        this.links = result;
        let linksForGraph = this.links.sort((x, y) => y.clicks - x.clicks).slice(0, 5);
        this.linkWiseCountLabels = linksForGraph.map(x => x.originalLink);
        this.linkWiseCounts = linksForGraph.map(x => x.clicks || 0);
      }, error => console.error(error));
  }
}
