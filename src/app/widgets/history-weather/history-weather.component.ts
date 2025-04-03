import { Component, computed, inject } from '@angular/core'
import { CityStateService, WeatherService } from '../../shared'
import { AsyncPipe } from '@angular/common'
import { CardDaysForecastComponent } from '../../entities'
import { TuiAppearance } from '@taiga-ui/core'
import { TuiCardLarge } from '@taiga-ui/layout'
import { TuiSkeleton } from '@taiga-ui/kit'

@Component({
  selector: 'app-history-weather',
  imports: [
    AsyncPipe,
    CardDaysForecastComponent,
    TuiAppearance,
    TuiCardLarge,
    TuiSkeleton
  ],
  templateUrl: './history-weather.component.html',
  styleUrl: './history-weather.component.css'
})
export class HistoryWeatherComponent {
  private weatherService = inject(WeatherService)
  private cityState = inject(CityStateService)

  protected historyWeather$ = computed(() => this.weatherService.getHistoryWeather(this.cityState.selectedCity))

}
