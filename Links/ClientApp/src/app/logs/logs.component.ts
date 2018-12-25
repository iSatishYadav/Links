import { Component, OnInit } from '@angular/core';
import { Log } from '../models/log';
import { LogService } from '../services/log/log.service';
import { ActivatedRoute } from '@angular/router';
import '../extensions/array';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})

export class LogsComponent implements OnInit {
  public logs: Log[];

  public osData: number[] = new Array<number>();
  public osLabels: string[] = new Array<string>();

  public browserData: number[] = new Array<number>();
  public browserLabels: string[] = new Array<string>();


  constructor(private _logService: LogService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this._logService.getLogs(id)
      .subscribe(logResult => {
        this.logs = logResult;

        let osSummary: any = this.logs.groupByCount('os');

        Object.keys(osSummary).map(k => {
          this.osData.push(osSummary[k]);
          this.osLabels.push(k);
          return k;
        });

        let browserSummary = this.logs.groupByCount('browser');

        Object.keys(browserSummary).map(k => {
          this.browserData.push(browserSummary[k]);
          this.browserLabels.push(k);
          return k;
        });
      }, error => console.error(error));
  }

}
