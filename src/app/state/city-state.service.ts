import { inject, Injectable, signal } from '@angular/core'
import { TuiAlertService } from '@taiga-ui/core'

@Injectable({
  providedIn: 'root'
})
export class CityStateService {
  selectedCitySignal = signal<string>(localStorage.getItem('selectedCity') ?? 'Moscow')
  followedCitiesSignal = signal<string[]>(JSON.parse(localStorage.getItem('followedCities')!) ?? ['Moscow', 'Saint-Petersburg', 'New-York'])
  private readonly alerts = inject(TuiAlertService)

  protected showNotification(): void {
    this.alerts
      .open('It\'s not your followed city!', {
        label: 'Please follow this city',
        appearance: 'warning',
        icon: '@tui.info',
        autoClose: 2500
      })
      .subscribe()
  }

  get followedCities() {
    return this.followedCitiesSignal()
  }

  removeSelectedCity(): void {
    // this.followedCities.s
  }

  get selectedCity() {
    if (this.followedCities.findIndex(city => city === this.selectedCitySignal()) === -1 || this.selectedCitySignal() === null) {
      return this.followedCities[0]
    }

    return this.selectedCitySignal()
  }

  set selectedCity(value: string) {
    console.log(value)
    if (this.followedCities.findIndex(city => city === value) === -1 || value === null) {
      this.showNotification()
      this.selectedCitySignal.set(this.followedCities[0])
    } else {
      this.selectedCitySignal.set(value)
    }
    localStorage.setItem('selectedCity', value)
  }
}
