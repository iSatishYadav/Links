import { Component, OnInit, Inject } from '@angular/core';
import { Link } from '../models/link';
import { LinkService } from '../services/link/link.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})

export class LinksComponent implements OnInit {
  public links: Link[];
  private _linkService: LinkService;
  selectedLink: Link;
  public pieData = [{ 'name': 'init', 'value': 0 }];

  private linksSummaryCount: number = 10;

  constructor(linkService: LinkService, private spinner: NgxSpinnerService) {
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
    this.spinner.show();
    this.getLinks();
  }
  getLinks() {
    this._linkService.getLinks()
      .subscribe(result => {
        this.links = result;
        let linksForGraph = this.links.sort((x, y) => y.clicks - x.clicks).slice(0, this.linksSummaryCount);
        this.pieData = linksForGraph.map((value) => {
          return { name: value.originalLink, value: value.clicks }
        });
        this.spinner.hide();
      }, error => console.error(error));
  }
}
