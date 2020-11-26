import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashboradComponent } from './components/dashborad/dashborad.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    DashboradComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
