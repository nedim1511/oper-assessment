import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { WeatherData } from '../models/weather-data.interface';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private API_KEY = '';
  private API_URL = 'https://api.openweathermap.org/data/2.5';

  constructor(private http: HttpClient) {}

  getCurrentWeather(lat: number, lon: number): Observable<WeatherData> {
    const url = `${this.API_URL}/weather?lat=${lat}&lon=${lon}&appid=${this.API_KEY}`;
    return this.http.get<WeatherData>(url);
  }

  getFiveDayForecast(lat: number, lon: number): Observable<WeatherData[]> {
    const url = `${this.API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${this.API_KEY}`;
    return this.http
      .get<{ list: WeatherData[] }>(url)
      .pipe(map((response) => response.list.slice(0, 4)));
  }
}
