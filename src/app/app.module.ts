import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';


import {LoginComponent} from './modules/login/login.component';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {CategoryService} from './services/category.service';
import {ClientService} from './services/client.service';
import {LoginService} from './services/login.service';
import {MovementService} from './services/movement.service';
import {ProductService} from './services/product.service';
import {UserService} from './services/user.service';
import {WarehouseService} from './services/warehouse.service';
import {InterceptorInterceptor} from './interceptors/interceptor.interceptor';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';

import {NotifierModule, NotifierOptions} from 'angular-notifier';
import { GraphProductComponent } from './shared/components/graph-product/graph-product.component';
import { StoreModule } from '@ngrx/store';
import {appEffects, REDUCER_TOKEN} from './store';
import {handleUndo} from 'ngrx-undo';
import {EffectsModule} from '@ngrx/effects';


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
  declarations: [
    AppComponent,
    LoginComponent,
    GraphProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NotifierModule.withConfig(customNotifierOptions),
    SweetAlert2Module.forRoot(),
    StoreModule.forRoot(REDUCER_TOKEN, { metaReducers: [handleUndo]}),
    EffectsModule.forRoot([...appEffects])

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorInterceptor,
    multi: true
  },
    CategoryService,
    ClientService,
    LoginService,
    MovementService,
    ProductService,
    UserService,
    WarehouseService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
