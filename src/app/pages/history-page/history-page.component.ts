import { Component, computed, inject } from '@angular/core'
import { HomePageHeaderComponent } from '../../components/home-page-header/home-page-header.component'
import { WeatherService } from '../../data/services/weather.service'
import { CityStateService } from '../../state/city-state.service'
import { CardDaysForecastComponent } from '../../components/home-page/card-days-forecast/card-days-forecast.component'
import { AsyncPipe } from '@angular/common'
import { TuiAppearance } from '@taiga-ui/core'
import { TuiCardLarge } from '@taiga-ui/layout'
import { TuiSkeleton } from '@taiga-ui/kit'

@Component({
  selector: 'app-history-page',
  imports: [
    HomePageHeaderComponent,
    CardDaysForecastComponent,
    AsyncPipe,
    TuiAppearance,
    TuiCardLarge,
    TuiSkeleton
  ],
  templateUrl: './history-page.component.html',
  styleUrl: './history-page.component.css'
})
export class HistoryPageComponent {
  private weatherService = inject(WeatherService)
  private cityState = inject(CityStateService)

  protected historyWeather$ = computed(() => this.weatherService.getHistoryWeather(this.cityState.selectedCity))
}
