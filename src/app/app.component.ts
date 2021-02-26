import {Component, OnInit} from '@angular/core';
import {FaunaService} from './fauna.service';
import {TrelloService} from './trello.service';
import {EChartsOption} from 'echarts';

interface Sprint {
  board: string;
  values: number[];
  startDate: string;
  endDate: string;
  days: boolean[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  echartsInstance;
  date = new Date();
  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  selectedDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  selectedColumns = ['Done'];
  dates = [1,2,2,3,4,5];
  sprint: Sprint;
  options: EChartsOption = {
    color: ['red', 'blue'],
    legend: {
      left: 'center',
      data: ['PLAN', 'REAL']
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: this.dates
    },
    grid: {
      left: '2%',
      right: '2%',
      bottom: '2%',
      containLabel: true
    },
    yAxis: {
      type: 'value',
      name: 'Tasks',
      nameLocation: 'middle',
      position: 'left',
      nameGap: 50
    },
    series: [
      {
        name: 'PLAN',
        type: 'line',
        data: [20,20,20,20,20]
      },
      {
        name: 'REAL',
        type: 'line',
        data: []
      }
    ]
  };


  constructor(private faunaService: FaunaService, private trelloService: TrelloService) {

  }

  ngOnInit() {
    this.faunaService.getBurndownValues().subscribe((res) =>  {
      // @ts-ignore
      this.sprint = res.data;
    });
  }

  onChartInit(ec) {
    this.echartsInstance = ec;
    this.options.series[1].data = this.sprint.values;
    console.log(this.options);
    this.echartsInstance.setOption(this.options);
  }
}
