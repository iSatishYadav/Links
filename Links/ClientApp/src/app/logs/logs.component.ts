import { Component, OnInit } from '@angular/core';
import { Log } from '../models/log';
import { LogService } from '../services/log/log.service';
import { ActivatedRoute } from '@angular/router';
import '../extensions/array';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})

export class LogsComponent implements OnInit {
  public logs: Log[];

  public osPieData: any[];
  public browserPieData: any[];

  constructor(private _logService: LogService, private route: ActivatedRoute, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    const id = +this.route.snapshot.paramMap.get('id');
    this._logService.getLogs(id)
      .subscribe(logResult => {
        this.logs = logResult;

        this.osPieData = this.getOsSummary(this.logs);
        this.browserPieData = this.getBrowserSummary(this.logs);

        this.spinner.hide();
      }, error => console.error(error));
  }


  private getBrowserSummary(logs: Log[]) {
    const browsers = logs.map(x => ({ browser: x.browser.split(' ', 1)[0] })).groupByCount('browser');
    const browserWiseCount = [];
    Object.keys(browsers).map(k => {
      browserWiseCount.push({ name: k, value: browsers[k] });
      return k;
    });
    return browserWiseCount;
  }

  private getOsSummary(logs: Log[]) {
    const oss: any = logs.map(x => ({ os: x.os.split(' ', 1)[0] })).groupByCount('os');
    const osWiseCount = [];
    Object.keys(oss).map(k => {
      osWiseCount.push({ name: k, value: oss[k] });
      return k;
    });
    return osWiseCount;
  }
}
