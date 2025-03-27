import { Component, computed, inject } from '@angular/core'
import { CardComponent } from '../../components/home-page/card/card.component'
import { TuiIcon } from '@taiga-ui/core'
import { TuiSkeleton, TuiTile, TuiTileHandle, TuiTilesComponent } from '@taiga-ui/kit'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { TuiComboBoxModule, TuiInputTagModule, TuiTextfieldControllerModule } from '@taiga-ui/legacy'
import { WeatherService } from '../../data/services/weather.service'
import { HomePageHeaderComponent } from '../../components/home-page-header/home-page-header.component'
import { CityStateService } from '../../state/city-state.service'
import { AsyncPipe } from '@angular/common'
import IForecastWeather from '../../data/interfaces/responseWeather.interface'
import {
  CardHoursForecastComponent
} from '../../components/home-page/card-hours-forecast/card-hours-forecast.component'
import { CardDaysForecastComponent } from '../../components/home-page/card-days-forecast/card-days-forecast.component'

enum Titles {
  Temperature = 'Temperature',
  Humidity = 'Humidity',
  TemperatureFeels = 'Temperature feels',
  Wind = 'Wind speed',
  Condition = 'Condition',
  Pressure = 'Pressure',
  ForecastHours = '12 hours forecast',
  ForecastDays = '3 days forecast',
}


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
    TuiSkeleton,
    CardHoursForecastComponent,
    CardDaysForecastComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  protected readonly cityState = inject(CityStateService)
  protected order = new Map()

  protected readonly items = [
    { w: 1, h: 1, title: Titles.Temperature, value: '' },
    { w: 1, h: 1, title: Titles.TemperatureFeels, value: '' },
    { w: 1, h: 1, title: Titles.Condition, value: '' },
    { w: 3, h: 3, title: Titles.ForecastHours, value: '' },
    { w: 1, h: 1, title: Titles.Humidity, value: '' },
    { w: 1, h: 1, title: Titles.Pressure, value: '' },
    { w: 1, h: 1, title: Titles.Wind, value: '' },
    { w: 3, h: 3, title: Titles.ForecastDays, value: '' }
  ]
  private readonly weatherService = inject(WeatherService)
  protected readonly weatherData$ = computed(() => this.weatherService.getForecastWeather(this.cityState.selectedCity))

  protected readonly getValueFromTitle = (title: string, weatherData: IForecastWeather): string => {
    switch (title) {
      case Titles.Temperature:
        return `${weatherData.current.temp_c}ºC`
      case Titles.Humidity:
        return `${weatherData.current.humidity}%`
      case Titles.TemperatureFeels:
        return `${weatherData.current.feelslike_c}ºC`
      case Titles.Pressure:
        return `${weatherData.current.pressure_mb} mb`
      case Titles.Condition:
        return `${weatherData.current.condition.text}`
      case Titles.Wind:
        return `${weatherData.current.wind_kph} kph`
      default:
        return ''
    }
  }
  protected readonly Titles = Titles
}
