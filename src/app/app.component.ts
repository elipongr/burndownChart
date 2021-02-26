import {Component, OnInit} from '@angular/core';
import {FaunaService} from './fauna.service';
import {formatDate} from '@angular/common';

interface Sprint {
  values: number[];
  startDate: string;
  endDate: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  echartsInstance;
  date = new Date();
  days = [1, 2, 4, 5];
  dates: string[] = [];
  sprint: Sprint;
  options = {
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
      axisLabel: {
        rotate: 15
      },
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
        data: [],
        markArea: {
          itemStyle: {
            color: '#E8E8E8'
          },
          data: [[{
            xAxis: 'Tag 2: Di. 09.03'
          }, {
            xAxis: 'Mi. 10.03'
          }], [{
            xAxis: 'Tag 4: Fr. 12.03'
          }, {
            xAxis: 'So. 14.03'
          }], [{
            xAxis: 'Tag 6: Di. 16.03'
          }, {
            xAxis: 'Mi. 17.03'
          }], [{
            xAxis: 'Tag 8: Fr. 19.03'
          }, {
            xAxis: 'So. 21.03'
          }], [{
            xAxis: 'Tag 10: Di. 23.03'
          }, {
            xAxis: 'Mi. 24.03'
          }], [{
            xAxis: 'Tag 12: Fr. 26.03'
          }, {
            xAxis: 'So. 28.03'
          }]]
        }
      },
      {
        name: 'REAL',
        type: 'line',
        data: []
      }
    ]
  };

  constructor(private faunaService: FaunaService) {

  }

  ngOnInit() {
  }

  onChartInit(ec) {
    this.echartsInstance = ec;
    this.faunaService.getBurndownValues().subscribe((res) => {
      // @ts-ignore
      this.sprint = res.data;
      this.options.series[1].data = this.sprint.values;
      this.options.xAxis.data = this.getDates(new Date(this.sprint.startDate), new Date(this.sprint.endDate));
      this.options.series[0].data = this.generatePlanLine(this.sprint.values[0]);
      this.echartsInstance.setOption(this.options);
    });
  }

  getDates(startDate, stopDate) {
    const dateArray: string[] = new Array();
    dateArray.push('Tag 0');
    const currentDate: Date = startDate;
    let i = 0;
    while (currentDate <= stopDate) {
      if (this.days.includes(currentDate.getDay())) {
        i++;
        dateArray.push('Tag ' + (i) + ': ' + formatDate(currentDate, 'EE dd.MM', 'de-DE'));
      } else {
        dateArray.push(formatDate(currentDate, 'EE dd.MM', 'de-DE'));
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateArray;
  }

  generatePlanLine(value) {
    const values: number[] = [value];
    let day = 1;
    let days = 13;
    let plannedValue;
    for (let i = 8; i <= 30; i++) {
      if (this.days.includes(day)) {
        plannedValue = value / 14 * days;
        days--;
      }
      day++;
      if (day > 7) {
        day = 1;
      }
      plannedValue = Math.round(plannedValue * 100) / 100;
      values.push(plannedValue);
    }
    return values;
  }
}
