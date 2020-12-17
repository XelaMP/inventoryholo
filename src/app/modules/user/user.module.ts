import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainComponent } from './components/main/main.component';
import { CategoryComponent } from './components/category/category.component';
import { ClientComponent } from './components/client/client.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MovementComponent } from './components/movement/movement.component';
import { ProductComponent } from './components/product/product.component';


import {UserRoutingModule} from './user-routing.module';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [DashboardComponent, MainComponent, MovementComponent, ClientComponent, ProductComponent, CategoryComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,

  ]
})

export class UserModule{}





