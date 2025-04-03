import { Component, computed, inject } from '@angular/core'
import { WeatherService } from '../../shared/api/services/weather.service'
import { CityStateService } from '../../shared/state/city-state.service'
import { CardDaysForecastComponent } from '../../entities/card-days-forecast/card-days-forecast.component'
import { AsyncPipe } from '@angular/common'
import { TuiAppearance } from '@taiga-ui/core'
import { TuiCardLarge } from '@taiga-ui/layout'
import { TuiSkeleton } from '@taiga-ui/kit'
import { HeaderComponent } from '../../widgets/header/header.component'

@Component({
  selector: 'app-history-page',
  imports: [
    CardDaysForecastComponent,
    AsyncPipe,
    TuiAppearance,
    TuiCardLarge,
    TuiSkeleton,
    HeaderComponent
  ],
  templateUrl: './history-page.component.html',
  styleUrl: './history-page.component.css'
})
export class HistoryPageComponent {
  private weatherService = inject(WeatherService)
  private cityState = inject(CityStateService)

  protected historyWeather$ = computed(() => this.weatherService.getHistoryWeather(this.cityState.selectedCity))
}
