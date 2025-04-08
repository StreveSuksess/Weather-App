import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment.development'
import GeonamesResponse from '../interfaces/responseSearchCity.interface'
import { map } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class SearchCityService {
  private http = inject(HttpClient)
  private baseApiUrl = environment.baseSearchCityApiUrl

  searchCity(city: string) {
    return this.http.get<GeonamesResponse>(`${this.baseApiUrl}searchJSON`, {
      params: {
        name_startsWith: city,
        cities: 'cities1000',
        maxRows: 10,
        username: environment.searchCityUsername
      }
    }).pipe(map((response: GeonamesResponse) => response.geonames.map(geoname => geoname.toponymName)))
  }
}
