import { inject, Injectable, signal } from '@angular/core'
import { TuiAlertService } from '@taiga-ui/core'

@Injectable({
  providedIn: 'root'
})
export class CityStateService {
  private readonly selectedCitySignal = signal<string>(localStorage.getItem('selectedCity') ?? 'Moscow')
  private readonly followedCitiesSignal = signal<string[]>(JSON.parse(localStorage.getItem('followedCities')!) ?? ['Moscow', 'Saint-Petersburg', 'New-York'])
  private readonly alerts = inject(TuiAlertService)

  private saveFollowedCityToLocalStorage(): void {
    localStorage.setItem('followedCities', JSON.stringify(this.followedCities))
  }

  private showNotification(title: string, subtitle: string): void {
    this.alerts
      .open(title, {
        label: subtitle,
        appearance: 'warning',
        icon: '@tui.info',
        autoClose: 2500
      })
      .subscribe()
  }

  public unfollowCity(cityToRemove: string): void {
    if (this.followedCitiesSignal().length === 1) {
      this.showNotification('You can\'t delete your last followed city!', '')
      return
    }
    this.followedCitiesSignal.update(followedCities => followedCities.filter(city => city !== cityToRemove))
    this.saveFollowedCityToLocalStorage()
  }

  public followCity(cityToAdd: string): void {
    if (this.followedCities.includes(cityToAdd)) return
    this.followedCitiesSignal.update(followedCities => [...followedCities, cityToAdd])
    this.saveFollowedCityToLocalStorage()
  }

  get followedCities() {
    return this.followedCitiesSignal()
  }

  get selectedCity() {
    if (this.followedCities.findIndex(city => city === this.selectedCitySignal()) === -1 || this.selectedCitySignal() === null) {
      return this.followedCities[0]
    }

    return this.selectedCitySignal()
  }

  set selectedCity(value: string) {
    if (this.followedCities.findIndex(city => city === value) === -1 || value === null) {
      this.showNotification('It\'s not your followed city!', 'Please follow this city')
      this.selectedCitySignal.set(this.followedCities[0])
    } else {
      this.selectedCitySignal.set(value)
    }
    localStorage.setItem('selectedCity', value)
  }
}
