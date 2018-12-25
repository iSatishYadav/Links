import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnChanges {

  @Input()
  chartLabels: string[];
  @Input()
  chartData: number[];
  @Input()
  chartType: string;

  constructor() {
  }

  ngOnChanges() {
    this.chartType = this.chartType || "pie";
    this.chartData = this.chartData || [100, 200, 300];
    console.log("Data", this.chartData);
    this.chartLabels = this.chartLabels || ["Hello", "World", "Friends"]
    console.log("Labels", this.chartLabels);
  }


  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}
