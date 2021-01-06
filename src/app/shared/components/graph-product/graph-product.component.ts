import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-annotation';
import {ProductService} from '../../../services/product.service';
import {ServiceProduct} from '../../../interfaces/services';
import {ngxLoadingAnimationTypes} from 'ngx-loading';

const PrimaryWhite = '#ffffff';
const SecondaryGrey = '#ccc';
const PrimaryRed = '#dd0031';
const SecondaryBlue = '#006ddd';

@Component({
  selector: 'app-graph-product',
  templateUrl: './graph-product.component.html',
  styleUrls: ['./graph-product.component.css']
})
export class GraphProductComponent implements OnInit, OnChanges {
  @Input() products: ServiceProduct[];


  public graphLabels: Label[] = ['Producto', 'Precio', 'Stock'];
  public graphData: number[] = [350, 450, 30, 50];
  public doughnutChartType: ChartType = 'doughnut';

  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = true;
  public primaryColour = PrimaryWhite;
  public secondaryColour = SecondaryGrey;

  constructor() {
  }


  ngOnInit(): void {
    this.primaryColour = PrimaryRed;
    this.secondaryColour = SecondaryBlue;
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

}
