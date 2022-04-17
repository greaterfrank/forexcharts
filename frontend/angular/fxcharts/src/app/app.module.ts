import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ChartCandle1Component } from './chart-candle1/chart-candle1.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartCandle1Component
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
