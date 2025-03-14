import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private http = inject(HttpClient)
  private baseApiUrl = 'https://api.weatherapi.com/v1/'


}
