import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { GeolocationErrorCode } from '../../../models/enums/geolocation-error-code.enum';
import { WeatherService } from '../../../services/weather.service';
import { Observable } from 'rxjs';
import { WeatherData } from '../../../models/interfaces/weather-data.interface';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss'],
})
export class CurrentWeatherComponent implements OnInit {
  public isLoading = false;
  public errorMessage: string | undefined;
  public weather$: Observable<WeatherData> | undefined;
  public openWeatherMapBaseImageUrl = 'https://openweathermap.org/img/wn/';

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

    this.weather$ = this.weatherService.getCurrentWeather(
      this.userPosition.coords.latitude,
      this.userPosition.coords.longitude
    );
  }
}
