import { Injectable, signal } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class CityStateService {
  selectedCitySignal = signal<string>(localStorage.getItem('selectedCity') ?? 'Moscow')
  followedCitiesSignal = signal<string[]>(JSON.parse(localStorage.getItem('followedCities')!) ?? ['Moscow', 'Saint-Petersburg', 'New-York'])

  get followedCities() {
    return this.followedCitiesSignal()
  }

  get selectedCity() {
    return this.selectedCitySignal()
  }

  set selectedCity(value: string) {
    console.log(value)
    if (!this.followedCities.findIndex(city => city === value) || value === null) {
      this.selectedCitySignal.set(this.followedCities[0])
    } else {
      this.selectedCitySignal.set(value)
    }
    localStorage.setItem('selectedCity', value)
  }
}
