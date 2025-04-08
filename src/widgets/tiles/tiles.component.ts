import { Component, computed, inject } from '@angular/core'
import { AsyncPipe } from '@angular/common'
import { CardComponent, CardDaysForecastComponent, CardHoursForecastComponent } from '../../entities'
import { TuiCardLarge } from '@taiga-ui/layout'
import { TuiIcon } from '@taiga-ui/core'
import { TuiSkeleton, TuiTile, TuiTileHandle, TuiTilesComponent } from '@taiga-ui/kit'
import { CityStateService, WeatherService } from '../../shared'
import IForecastWeather from '../../shared/api/interfaces/responseWeather.interface'

enum Titles {
  Temperature = 'Temperature',
  Humidity = 'Humidity',
  TemperatureFeels = 'Temperature feels',
  Wind = 'Wind speed',
  Condition = 'Condition',
  Pressure = 'Pressure',
  ForecastHours = '12 hours forecast',
  ForecastDays = '3 days forecast',
  Sunrise = 'Sunrise',
  Sunset = 'Sunset',
  MoonPhase = 'Moon Phase',
}

@Component({
  selector: 'app-tiles',
  imports: [
    AsyncPipe,
    CardComponent,
    CardDaysForecastComponent,
    CardHoursForecastComponent,
    TuiCardLarge,
    TuiIcon,
    TuiTile,
    TuiTileHandle,
    TuiTilesComponent,
    TuiSkeleton
  ],
  templateUrl: './tiles.component.html',
  styleUrl: './tiles.component.css'
})
export class TilesComponent {
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
    { w: 3, h: 3, title: Titles.ForecastDays, value: '' },
    { w: 1, h: 1, title: Titles.Sunrise, value: '' },
    { w: 1, h: 1, title: Titles.Sunset, value: '' },
    { w: 1, h: 1, title: Titles.MoonPhase, value: '' }
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
      case Titles.Sunrise:
        return `${weatherData.forecast.forecastday[0].astro.sunrise}`
      case Titles.Sunset:
        return `${weatherData.forecast.forecastday[0].astro.sunset}`
      case Titles.MoonPhase:
        return `${weatherData.forecast.forecastday[0].astro.moon_phase}`
      default:
        return ''
    }
  }
  protected readonly Titles = Titles
}
