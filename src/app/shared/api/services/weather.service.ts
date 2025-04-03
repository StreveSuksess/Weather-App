import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import IForecastWeather from '../interfaces/responseWeather.interface'
import { environment } from '../../../../environments/environment.development'

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private http = inject(HttpClient)
  private baseApiUrl = environment.baseWeatherApiUrl

  private getLastDate(daysAgo: number) {
    const date = new Date()

    date.setDate(date.getDate() - daysAgo)

    return date.toISOString().split('T')[0]
  }

  getForecastWeather(city: string) {
    return this.http.get<IForecastWeather>(`${this.baseApiUrl}forecast.json`, {
      params: {
        q: city,
        days: 3
      }
    })
  }

  getHistoryWeather(city: string) {
    return this.http.get<IForecastWeather>(`${this.baseApiUrl}history.json`, {
      params: {
        q: city,
        dt: this.getLastDate(7),
        end_dt: this.getLastDate(1)
      }
    })
  }
}
