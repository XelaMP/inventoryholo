import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MainComponent } from './components/main/main.component';
import { UserComponent } from './components/user/user.component';
import { WarehouseComponent } from './components/warehouse/warehouse.component';
import {FormsModule} from '@angular/forms';
import {AdminRoutingModule} from './admin-routing.module';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';






@NgModule({
  declarations: [UserComponent, WarehouseComponent, MainComponent, DashboardComponent, ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SweetAlert2Module,
    FormsModule,


  ]
})
export class AdminModule { }
