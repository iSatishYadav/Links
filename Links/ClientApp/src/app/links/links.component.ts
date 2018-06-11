import { Component, OnInit, Inject } from '@angular/core';
import { Link } from '../models/link';
import { LinkService } from '../services/link/link.service';

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

  constructor(linkService: LinkService) {
    this._linkService = linkService;
    linkService.getLinks()
      .subscribe(result => {
        this.links = result;        
      }, error => console.error(error));
  }

  onSelect(link: Link): void {
    this.selectedLink = link;    
  }

  ngOnInit() {
    //this._userName = this._authService.getName();    
  }
}
