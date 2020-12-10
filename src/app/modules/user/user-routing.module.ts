import {MainComponent} from './components/main/main.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {ClientComponent} from './components/client/client.component';
import {MovementComponent} from './components/movement/movement.component';
import {CategoryComponent} from './components/category/category.component';
import {ProductComponent} from './components/product/product.component';
import {NgModel} from '@angular/forms';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        children: [
          {path: 'dashboard', component: DashboardComponent  },
          { path: 'clients', component: ClientComponent },
          { path: 'movements', component: MovementComponent },
          { path: 'categories', component: CategoryComponent },
          { path: 'products', component: ProductComponent },
          { path: '**', pathMatch: 'full', redirectTo: 'dashboard' },

        ]
      }
    ]
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule {}
