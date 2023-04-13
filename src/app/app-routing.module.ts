import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurrentWeatherComponent } from './pages/current-weather/current-weather.component';
import { ForecastWeatherComponent } from './pages/forecast-weather/forecast-weather.component';

const routes: Routes = [
  { path: '', component: CurrentWeatherComponent },
  { path: 'four-days', component: ForecastWeatherComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
