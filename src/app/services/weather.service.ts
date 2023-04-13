import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { WeatherData } from '../models/interfaces/weather-data.interface';
import { environment } from '../../environments/environment';
import { WeatherForecastListItemData } from '../models/interfaces/weather-forecast-data.interface';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private API_KEY = environment.apiKey;
  private API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCurrentWeather(lat: number, lon: number): Observable<WeatherData> {
    const url = `${this.API_URL}/weather?lat=${lat}&lon=${lon}&appid=${this.API_KEY}`;
    return this.http.get<WeatherData>(url);
  }

  getFourDayForecast(lat: number, lon: number): Observable<WeatherForecastListItemData[]> {
    const url = `${this.API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${this.API_KEY}`;
    return this.http.get<{ list: WeatherForecastListItemData[] }>(url).pipe(
      map((response) => this.filterForecastForFourDays(response))
    );
  }

  private filterForecastForFourDays(response: { list: WeatherForecastListItemData[] }): WeatherForecastListItemData[] {
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const days = this.generateDatesForFourDaysFromTomorrow(tomorrow);

    const filteredData = [];
    for (const day of days) {
      const itemsForDay = this.getItemsForDay(response.list, day);

      if (itemsForDay.length > 0) {
        const itemForDay = itemsForDay[0];
        itemForDay.dt_txt = day.toISOString();
        filteredData.push(itemForDay);
      }
    }

    return filteredData;
  }

  private generateDatesForFourDaysFromTomorrow(tomorrow: Date): Date[] {
    const days = [];
    for (let i = 0; i < 4; i++) {
      const date = new Date(tomorrow);
      date.setDate(date.getDate() + i);
      date.setHours(0, 0, 0, 0);
      days.push(date);
    }
    return days;
  }

  private getItemsForDay(list: WeatherForecastListItemData[], day: Date): WeatherForecastListItemData[] {
    return list.filter((item) => {
      const itemDate = new Date(item.dt_txt);
      return itemDate.getFullYear() === day.getFullYear() && itemDate.getMonth() === day.getMonth() && itemDate.getDate() === day.getDate();
    });
  }

}
