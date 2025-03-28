import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import IForecastWeather from '../interfaces/responseWeather.interface'
import { environment } from '../../../environments/environment.development'

@Injectable({
  providedIn: 'root'
})
export class SearchCityService {
  private http = inject(HttpClient)
  private baseApiUrl = environment.baseSearchCityApiUrl

  searchCity(city: string) {
    return this.http.get<IForecastWeather>(`${this.baseApiUrl}searchJSON`, {
      params: {
        name_startsWith: city,
        cities: 'cities1000',
        maxRows: 10,
        username: environment.searchCityUsername
      }
    })
  }


}
