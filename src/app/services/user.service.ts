import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  getUserCoordinates(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  handleGeolocationError(code = 0, message = 'Unknown'): void {
    alert(
      'Could not retrieve data because of error: ' + message + ' (' + code + ')'
    );
  }
}
