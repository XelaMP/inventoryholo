import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MainComponent } from './components/main/main.component';
import { UserComponent } from './components/user/user.component';
import { WarehouseComponent } from './components/warehouse/warehouse.component';
import {FormsModule} from '@angular/forms';
import {AdminRoutingModule} from './admin-routing.module';






@NgModule({
  declarations: [DashboardComponent, MainComponent, UserComponent, WarehouseComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
  ]
})
export class AdminModule { }
