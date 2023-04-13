import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';
import { WeatherService } from '../../services/weather.service';
import { GeolocationErrorCode } from '../../models/enums/geolocation-error-code.enum';
import { WeatherForecastListItemData } from '../../models/interfaces/weather-forecast-data.interface';

@Component({
  selector: 'app-forecast-weather',
  templateUrl: './forecast-weather.component.html',
  styleUrls: ['./forecast-weather.component.scss'],
})
export class ForecastWeatherComponent {
  public isLoading = false;
  public errorMessage: string | undefined;
  public openWeatherMapBaseImageUrl = 'https://openweathermap.org/img/wn/';
  public weatherForecast$:
    | Observable<WeatherForecastListItemData[]>
    | undefined;

  private userPosition: GeolocationPosition | undefined;

  constructor(
    private userService: UserService,
    private weatherService: WeatherService
  ) {}

  ngOnInit(): void {
    this.getUserCoordinates().then(() => this.getWeatherData());
  }

  private getUserCoordinates(): Promise<GeolocationPosition> {
    this.isLoading = true;
    return this.userService
      .getUserCoordinates()
      .then((position) => {
        this.userPosition = position;
        return position;
      })
      .catch((error) => {
        this.handleGeolocationError(error.code, error.message);
        this.isLoading = false;
        throw error;
      });
  }

  private handleGeolocationError(
    errorCode: GeolocationErrorCode,
    errorMessage: string
  ): void {
    this.userService.handleGeolocationError(errorCode, errorMessage);

    switch (errorCode) {
      case GeolocationErrorCode.PERMISSION_DENIED:
        this.errorMessage =
          'Please enable location services in your browser settings to use this app. Refresh the page when you are done.';
        break;
      default:
        this.errorMessage = errorMessage
          ? errorMessage
          : 'Something went wrong. Please try again later.';
    }
  }

  private getWeatherData() {
    if (this.userPosition === undefined) {
      this.isLoading = false;
      this.errorMessage = 'Something went wrong. Please try again later.';
      return;
    }

    this.weatherForecast$ = this.weatherService.getFourDayForecast(
      this.userPosition.coords.latitude,
      this.userPosition.coords.longitude
    );
  }
}
