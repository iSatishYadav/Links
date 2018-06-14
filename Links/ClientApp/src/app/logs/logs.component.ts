import { Component, OnInit } from '@angular/core';
import { Log } from '../models/log';
import { LogService } from '../services/log/log.service';
import { Link } from '../shortner/link';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
  public logs: Log[];
  private _logService: LogService;  
  private _selecteLink: Link;

  constructor(logService: LogService, private route: ActivatedRoute) {
    this._logService = logService;
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this._logService.getLogs(id)
      .subscribe(logResult => {
        this.logs = logResult;
        console.log(logResult);
      }, error => console.error(error));
  }

}
