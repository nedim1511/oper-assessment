import { Component, OnInit } from '@angular/core';
import { catchError, finalize, Observable, of } from 'rxjs';
import { UserService } from '../../services/user.service';
import { WeatherService } from '../../services/weather.service';
import { WeatherForecastListItemData } from '../../models/interfaces/weather-forecast-data.interface';

@Component({
  selector: 'app-forecast-weather',
  templateUrl: './forecast-weather.component.html',
  styleUrls: ['./forecast-weather.component.scss'],
})
export class ForecastWeatherComponent implements OnInit {
  public isLoading = true;
  public errorMessage: string | undefined;
  public weatherForecast$:
    | Observable<WeatherForecastListItemData[]>
    | undefined;

  private userPosition: GeolocationPosition | undefined;

  constructor(
    private userService: UserService,
    private weatherService: WeatherService
  ) {}

  ngOnInit(): void {
    this.getUserCoordinates()
      .then(() => this.getWeatherData())
      .catch((error) => {
        this.isLoading = false;
        this.errorMessage = this.userService.handleGeolocationError(
          error.code,
          error.message
        );
      });
  }

  public onForecastItemClick(item: WeatherForecastListItemData): void {
    console.log(item);
  }

  private getUserCoordinates(): Promise<GeolocationPosition> {
    return navigator.permissions
      .query({ name: 'geolocation' })
      .then((permissionStatus) => {
        if (permissionStatus.state === 'granted') {
          return this.userService.getUserCoordinates();
        } else if (permissionStatus.state === 'prompt') {
          return new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
              (position) => resolve(position),
              (error) => reject(error)
            );
          });
        } else {
          throw new Error('Location permission not granted');
        }
      })
      .then((position) => {
        this.userPosition = position;
        return position;
      })
      .catch((error) => {
        throw error;
      });
  }

  private getWeatherData() {
    if (this.userPosition === undefined) {
      this.isLoading = false;
      this.errorMessage = 'Something went wrong. Please try again later.';
      return;
    }

    this.weatherForecast$ = this.weatherService
      .getFourDayForecast(
        this.userPosition.coords.latitude,
        this.userPosition.coords.longitude
      )
      .pipe(
        catchError((error) => {
          this.errorMessage = error.error.message;
          return of([]);
        }),
        finalize(() => {
          this.isLoading = false;
        })
      );
  }
}
