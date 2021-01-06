import {NotifierModule, NotifierOptions} from 'angular-notifier';
import {Utils} from '../utils';
import {GraphProductComponent} from './graph-product/graph-product.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ChartsModule} from 'ng2-charts';
import {NgxLoadingModule} from 'ngx-loading';


const customNotifierOptions: NotifierOptions = Utils.customNotifierOptions;

@NgModule({
  declarations: [GraphProductComponent],
  exports: [
    GraphProductComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NotifierModule.withConfig(customNotifierOptions),
    ChartsModule,
    NgxLoadingModule,
  ]
})
export class ComponentsModule {
}

