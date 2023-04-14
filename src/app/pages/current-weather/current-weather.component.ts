import { Component, NgZone, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { WeatherService } from '../../services/weather.service';
import { catchError, finalize, Observable, of } from 'rxjs';
import { WeatherData } from '../../models/interfaces/weather-data.interface';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss'],
})
export class CurrentWeatherComponent implements OnInit {
  public isLoading = true;
  public errorMessage: string | undefined;
  public weather$: Observable<WeatherData> | undefined;
  public openWeatherMapBaseImageUrl = 'https://openweathermap.org/img/wn/';

  private userPosition: GeolocationPosition | undefined;

  constructor(
    private zone: NgZone,
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
      this.errorMessage = this.userService.handleGeolocationError();
      return;
    }

    this.weather$ = this.weatherService
      .getCurrentWeather(
        this.userPosition.coords.latitude,
        this.userPosition.coords.longitude
      )
      .pipe(
        catchError((error) => {
          this.errorMessage = error.error.message;
          return of({} as WeatherData);
        }),
        finalize(() => {
          this.isLoading = false;
        })
      );
  }
}
