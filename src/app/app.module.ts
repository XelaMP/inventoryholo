import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';



import { LoginComponent } from './modules/login/login.component';
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



@NgModule({
  declarations: [
    AppComponent,
   LoginComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SweetAlert2Module.forRoot(),

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
