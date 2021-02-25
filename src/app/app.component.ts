import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  dates = [
    new Date(2021, 3, 8),
    new Date(2021, 3, 9),
    new Date(2021, 3, 11),
    new Date(2021, 3, 12),
    new Date(2021, 3, 15),
    new Date(2021, 3, 16),
    new Date(2021, 3, 18),
    new Date(2021, 3, 19),
    new Date(2021, 3, 22),
    new Date(2021, 3, 23),
    new Date(2021, 3, 25),
    new Date(2021, 3, 26),
    new Date(2021, 3, 29),
    new Date(2021, 3, 30),
  ];

  options = {
    legend: {
      left: 'center',
      data: ['PLAN', 'REAL']
    },
    xAxis: {
      type: 'category',
      name: 'x',
      boundaryGap: false,
      splitLine: {show: false},
      data: this.dates
    },
    grid: {
      left: '2%',
      right: '2%',
      bottom: '2%',
      containLabel: true
    },
    yAxis: {
      type: 'log',
      name: 'Tasks',
      nameLocation: 'middle',
      position: 'left',
      nameGap: 50
    },
    series: [
      {
        name: 'PLAN',
        type: 'line',
        data: [1, 3, 9, 27, 81, 247, 741, 2223, 6669]
      },
      {
        name: 'REAL',
        type: 'line',
        data: [1 / 2, 1 / 4, 1 /8, 1/16, 1/32, 1/64, 1/128, 1/256, 1/512, 1/1024, 1/2048, 1 /4096,1 /8192, 1 /16384]
      }
    ]
  };
}
