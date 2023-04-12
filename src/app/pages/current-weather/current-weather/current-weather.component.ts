import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss'],
})
export class CurrentWeatherComponent implements OnInit {
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
        console.log(this.userPosition);
      })
      .catch((error) => {
        console.log('Error getting location', error);
      });
  }
}
