import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { GeolocationErrorCode } from '../../../models/enums/geolocation-error-code.enum';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss'],
})
export class CurrentWeatherComponent implements OnInit {
  public locationPermissionDenied = false;
  private userPosition: GeolocationPosition | undefined;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUserCoordinates();
  }

  private getUserCoordinates() {
    this.userService
      .getUserCoordinates()
      .then((position) => {
        this.userPosition = position;
      })
      .catch((error) => {
        this.userService.handleGeolocationError(error?.code, error?.message);
        this.locationPermissionDenied =
          error.code === GeolocationErrorCode.PERMISSION_DENIED;
      });
  }
}
