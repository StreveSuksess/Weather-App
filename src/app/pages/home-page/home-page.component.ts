import { Component, computed, effect, inject, signal } from '@angular/core'
import { CardComponent } from '../../components/home-page/card/card.component'
import { TuiIcon } from '@taiga-ui/core'
import { TuiTile, TuiTileHandle, TuiTilesComponent } from '@taiga-ui/kit'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { TuiComboBoxModule, TuiInputTagModule, TuiTextfieldControllerModule } from '@taiga-ui/legacy'
import { WeatherService } from '../../data/services/weather.service'
import { HomePageHeaderComponent } from '../../components/home-page-header/home-page-header.component'
import { CityStateService } from '../../state/city-state.service'
import { AsyncPipe } from '@angular/common'
import { CardForecastComponent } from '../../components/home-page/card-forecast/card-forecast.component'

@Component({
  selector: 'app-home-page',
  imports: [
    CardComponent,
    TuiTilesComponent,
    TuiIcon,
    TuiTile,
    TuiTileHandle,
    FormsModule,
    ReactiveFormsModule,
    TuiInputTagModule,
    TuiTextfieldControllerModule,
    TuiComboBoxModule,
    HomePageHeaderComponent,
    AsyncPipe,
    CardForecastComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  protected readonly cityState = inject(CityStateService)
  protected order = new Map()

  localWeatherData = signal<{
    temperature: number,
    humidity: number,
    temperatureFeels: number
  }>({
    temperature: 0,
    humidity: 0,
    temperatureFeels: 0
  })
  protected items = computed<{ w: number, h: number, title: string, value: string }[]>(() => [
    {
      w: 1,
      h: 1,
      title: 'Temperature',
      value: `${this.localWeatherData().temperature}ºC`
    },
    {
      w: 1,
      h: 1,
      title: 'Temperature feels',
      value: `${this.localWeatherData().temperatureFeels}ºC`
    },
    {
      w: 1,
      h: 1,
      title: 'Humidity',
      value: `${this.localWeatherData().humidity}%`
    },
    { w: 3, h: 3, title: '12 hours forecast', value: 'aoa' }
  ])
  private weatherService = inject(WeatherService)
  protected readonly weatherData$ = computed(() => this.weatherService.getForecastWeather(this.cityState.selectedCity))

  constructor() {
    effect(() => {
      const sub = this.weatherService.getForecastWeather(this.cityState.selectedCity)
        .subscribe(weather => {
          this.localWeatherData.set({
              temperature: weather.current.temp_c,
              temperatureFeels: weather.current.feelslike_c,
              humidity: weather.current.humidity
            }
          )
        })

      return () => sub.unsubscribe()
    })
  }
}
