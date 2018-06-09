import { Component, OnInit, Inject } from '@angular/core';
import { Link } from './link';
import { LinkService } from '../services/link/link.service';

@Component({
  selector: 'app-shortner',
  templateUrl: './shortner.component.html',
  styleUrls: ['./shortner.component.css']
})
export class ShortnerComponent implements OnInit {

  private _linkService: LinkService;
  constructor(linkService: LinkService) {
    this._linkService = linkService;
  }

  ngOnInit() {
  }
  submitted = false;

  onSubmit() {
    this.submitted = true;    
    this._linkService.postUrlForShortening(JSON.stringify(this.model))
      .subscribe(result => {        
        console.log("links", result);
        this.model = new Link("");
        this.model.shortUrl = result;        
      }, error => console.error(error));
  }
  model = new Link("");

  get diagnostic() {
    return JSON.stringify(this.model);
  }
  newUrl() {
    this.model = new Link("");
  }
}
