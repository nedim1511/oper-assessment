import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CurrentWeatherComponent } from './pages/current-weather/current-weather/current-weather.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { ErrorAlertComponent } from './shared/error-alert/error-alert/error-alert.component';

@NgModule({
  declarations: [AppComponent, CurrentWeatherComponent, ErrorAlertComponent],
  imports: [BrowserModule, RouterModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
