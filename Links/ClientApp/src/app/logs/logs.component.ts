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
  public timeSeries: any;
  public chartTitle: string = 'Clicks';
  constructor(private _logService: LogService, private route: ActivatedRoute, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    const id = +this.route.snapshot.paramMap.get('id');
    this._logService.getLogs(id)
      .subscribe(logResult => {
        this.logs = logResult;

        this.osPieData = this.getOsSummary(this.logs);
        this.browserPieData = this.getBrowserSummary(this.logs);
        this.timeSeries = this.getTimeSeries(this.logs);

        this.spinner.hide();
      }, error => console.error(error));
  }


  private getTimeSeries(logs: Log[]): any {
    //console.log(logs.map(x => new Date(x.timestamp)));
    return ({
      name: "Clicks",
      series: logs.map(x => ({
        name: new Date(x.timestamp).getDay(),
        value: 1
      }))
    });
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
