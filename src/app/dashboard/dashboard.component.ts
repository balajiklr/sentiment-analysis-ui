import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Analysis } from '../api/analysis';
import { AnalysisService } from '../service/analysisservice';

@Component({
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
  totalMessage!: number;
  veryPositive!: number;
  positive!: number;
  neutral!: number;
  negative!: number;
  veryNegative!: number;

  analysis!: Analysis[];

  chartData: any;

  chartOptions: any;

  subscription!: Subscription;
  statusCounts: { [status: string]: number } = {};
  totalCount: number = 0;

  constructor(private analysisService: AnalysisService) {}

  ngOnInit() {
    this.analysisService.getData().then((data) => {
      this.analysis = data;
      this.calculateStatusCounts();
      this.calculateTotalCount();
      this.initChart();
    });
  }
  calculateStatusCounts(): void {
    for (const data of this.analysis) {
      if (this.statusCounts.hasOwnProperty(data.status)) {
        this.statusCounts[data.status]++;
      } else {
        this.statusCounts[data.status] = 1;
      }
    }
  }

  calculateTotalCount(): void {
    this.totalCount = this.analysis.length;
  }

  initChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    const allStatuses = [
      'VERY_POSITIVE',
      'POSITIVE',
      'NEUTRAL',
      'NEGATIVE',
      'VERY_NEGATIVE',
    ];

    this.chartData = {
      labels: allStatuses,
      datasets: [
        {
          label: 'Count',
          backgroundColor: allStatuses.map((status) =>
            this.getStatusColor(status)
          ),
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 1,
          data: allStatuses.map((status) => this.statusCounts[status] || 0),
        },
      ],
    };

    this.chartOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'VERY_POSITIVE':
        return 'green';
      case 'POSITIVE':
        return 'lightgreen';
      case 'NEUTRAL':
        return 'gray';
      case 'NEGATIVE':
        return 'orange';
      case 'VERY_NEGATIVE':
        return 'red';
      default:
        return 'black';
    }
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
