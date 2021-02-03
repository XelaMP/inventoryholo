import {MainComponent} from './components/main/main.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {ClientComponent} from './components/client/client.component';
import {MovementComponent} from './components/movement/movement.component';
import {CategoryComponent} from './components/category/category.component';
import {ProductComponent} from './components/product/product.component';

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MeasureComponent} from './components/measure/measure.component';
import {ProviderComponent} from './components/provider/provider.component';
import {InvoiceComponent} from './components/invoice/invoice.component';
import {BrandComponent} from './components/brand/brand.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        children: [
          {path: 'dashboard', component: DashboardComponent},
          {path: 'clients', component: ClientComponent},
          {path: 'movements/:type', component: MovementComponent},
          {path: 'categories', component: CategoryComponent},
          {path: 'products', component: ProductComponent},
          { path: 'measure', component: MeasureComponent },
          { path: 'provider', component: ProviderComponent },
          { path: 'invoice', component: InvoiceComponent },
          { path: 'brand', component: BrandComponent },
          {path: '**', pathMatch: 'full', redirectTo: 'dashboard'},

        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
