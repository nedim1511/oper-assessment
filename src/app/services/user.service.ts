import { Injectable } from '@angular/core';
import { GeolocationErrorCode } from '../models/enums/geolocation-error-code.enum';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  getUserCoordinates(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  handleGeolocationError(
    errorCode: GeolocationErrorCode = GeolocationErrorCode.UNKNOWN_ERROR,
    errorMessage?: string
  ): string {
    switch (errorCode) {
      case GeolocationErrorCode.PERMISSION_DENIED:
        return 'Please enable location services in your browser settings to use this app. Refresh the page when you are done.';
      case GeolocationErrorCode.UNKNOWN_ERROR:
        return 'Unknown error has occurred. Please try again later.';
      default:
        return errorMessage
          ? errorMessage
          : 'Something went wrong. Please try again later.';
    }
  }
}
