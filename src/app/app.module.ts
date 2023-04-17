import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CurrentWeatherComponent } from './pages/current-weather/current-weather.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { ErrorAlertComponent } from './shared/error-alert/error-alert.component';
import { HttpClientModule } from '@angular/common/http';
import { ForecastWeatherComponent } from './pages/forecast-weather/forecast-weather.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { ForecastWeatherWidgetComponent } from './components/forecast-weather-widget/forecast-weather-widget.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrentWeatherComponent,
    ErrorAlertComponent,
    ForecastWeatherComponent,
    LoadingSpinnerComponent,
    ForecastWeatherWidgetComponent,
  ],
  imports: [BrowserModule, RouterModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
