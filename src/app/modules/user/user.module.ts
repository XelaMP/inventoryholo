import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MainComponent} from './components/main/main.component';
import {CategoryComponent} from './components/category/category.component';
import {ClientComponent} from './components/client/client.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {MovementComponent} from './components/movement/movement.component';
import {ProductComponent} from './components/product/product.component';


import {UserRoutingModule} from './user-routing.module';
import {FormsModule} from '@angular/forms';
import {NotifierModule, NotifierOptions, NotifierService} from 'angular-notifier';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import {ComponentsModule} from '../../shared/components/components.module';

const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right',
      distance: 12
    },
    vertical: {
      position: 'bottom',
      distance: 12,
      gap: 10
    }
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};


@NgModule({
  declarations: [DashboardComponent, MainComponent, MovementComponent, ClientComponent, ProductComponent, CategoryComponent],
    imports: [
        CommonModule,
        UserRoutingModule,
        SweetAlert2Module,
        FormsModule,
        NotifierModule.withConfig(customNotifierOptions),
        ComponentsModule,

    ]
})

export class UserModule {
}





