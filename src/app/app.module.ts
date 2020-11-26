import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import {UserModule} from './modules/user/user.module';

import { LoginComponent } from './modules/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LoginComponent

  ],
  imports: [
    BrowserModule,
    UserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
