import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private navigator: Navigator) {}

  getUserCoordinates(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      this.navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }
}
