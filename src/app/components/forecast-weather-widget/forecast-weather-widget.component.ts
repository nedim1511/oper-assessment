import { Component, Input } from '@angular/core';
import { WeatherForecastListItemData } from '../../models/interfaces/weather-forecast-data.interface';

@Component({
  selector: 'app-forecast-weather-widget',
  templateUrl: './forecast-weather-widget.component.html',
  styleUrls: ['./forecast-weather-widget.component.scss'],
})
export class ForecastWeatherWidgetComponent {
  @Input() forecast: WeatherForecastListItemData | undefined;

  public openWeatherMapBaseImageUrl = 'https://openweathermap.org/img/wn/';
}
