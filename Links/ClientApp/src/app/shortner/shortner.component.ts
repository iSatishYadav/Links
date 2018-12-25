import { Component, OnInit, Inject } from '@angular/core';
import { Link } from './link';
import { LinkService } from '../services/link/link.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-shortner',
  templateUrl: './shortner.component.html',
  styleUrls: ['./shortner.component.scss']
})
export class ShortnerComponent implements OnInit {

  constructor(private linkService: LinkService, private spinner: NgxSpinnerService) { }
  model = new Link("");
  private submitted = false;

  ngOnInit() {

  }

  onSubmit() {
    this.submitted = true;
    this.spinner.show();

    this.linkService.postUrlForShortening(JSON.stringify(this.model))
      .subscribe(result => {
        console.log("links", result);
        this.model = new Link("");
        this.model.shortUrl = result;
        this.submitted = false;
        this.spinner.hide();
      }, error => console.error(error));
  }

  get diagnostic() {
    return JSON.stringify(this.model);
  }
  newUrl() {
    this.model = new Link("");
  }
}
