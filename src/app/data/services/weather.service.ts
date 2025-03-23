import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import IForecastWeather from '../interfaces/responseWeather.interface'

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private http = inject(HttpClient)
  private baseApiUrl = 'https://api.weatherapi.com/v1/'

  getForecastWeather(city: string) {
    return this.http.get<IForecastWeather>(`${this.baseApiUrl}forecast.json`, {
      params: {
        q: city,
        days: 2,
        key: '19df4880065b439fbfa103452251303'
      }
    })
  }
}
