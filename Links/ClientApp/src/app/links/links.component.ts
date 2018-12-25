import { Component, OnInit, Inject } from '@angular/core';
import { Link } from '../models/link';
import { LinkService } from '../services/link/link.service';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})

export class LinksComponent implements OnInit {
  public links: Link[];
  private _linkService: LinkService;
  selectedLink: Link;
  public linkWiseCountLabels: string[];
  public linkWiseCounts: number[];

  constructor(linkService: LinkService) {
    this._linkService = linkService;
  }


  ngOnDestroy() {

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
