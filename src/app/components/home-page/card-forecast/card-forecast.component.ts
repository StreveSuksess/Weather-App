import { Component, computed, input, Input, Signal } from '@angular/core'
import IForecastWeather from '../../../data/interfaces/responseWeather.interface'
import { TuiAxes, TuiLineChart } from '@taiga-ui/addon-charts'
import { TuiPoint, TuiTitle } from '@taiga-ui/core'
import { TuiHeader } from '@taiga-ui/layout'

const multiplyCoefficient = 30
const amortizationCoefficient = 10

@Component({
  selector: 'app-card-forecast',
  imports: [
    TuiAxes,
    TuiTitle,
    TuiHeader,
    TuiLineChart
  ],
  templateUrl: './card-forecast.component.html',
  styleUrl: './card-forecast.component.css'
})
export class CardForecastComponent {
  weatherData = input<IForecastWeather>()
  @Input() title!: string

  protected readonly hourArr = computed(() => {
    if (this.weatherData() !== undefined) {
      return [...this.weatherData()!.forecast.forecastday[0].hour, ...this.weatherData()!.forecast.forecastday[1].hour]
    }
    return []
  })
  protected readonly currentHour = computed(() => {
    if (this.weatherData() !== undefined) {
      return new Date(this.weatherData()!.location.localtime).getHours()
    }
    return new Date().getHours()
  })

  protected temperatureForecastDay: Signal<TuiPoint[]> = computed(() => {
    return this.hourArr().slice(this.currentHour() - 1, this.currentHour() + 12).map((hour, index) => [index, (hour.temp_c * multiplyCoefficient)])
  })
  protected minY = computed(() => {
    return Math.min(...this.temperatureForecastDay().map((temperatureForecastDay) => temperatureForecastDay[1])) - amortizationCoefficient
  })
  protected maxY = computed(() => {
    return Math.max(...this.temperatureForecastDay().map((temperatureForecastDay) => temperatureForecastDay[1])) + amortizationCoefficient
  })

  protected axisXLabels: string[] = []
  protected axisYLabels = computed(() => {
    const min = this.minY()
    const max = this.maxY()
    const countLines = 5
    const result: string[] = []

    if (max <= min) {
      return result
    }

    const step = (max - min) / (countLines - 1)

    for (let i = 0; i < countLines; i++) {
      const currentY = min + step * i
      const tempC = (currentY) / multiplyCoefficient
      result.push(tempC.toFixed(1) + 'ºC')
    }
    return result
  })

  ngOnInit() {
    for (let i = 0; i < 13; i++) {
      let hour = this.currentHour() - 1 + i
      if (hour > 23) {
        hour -= 24
      }
      this.axisXLabels.push(`${hour}:00`)
    }
  }


  protected readonly stringifyTime = (item: number) => {
    return this.axisXLabels[item]
  }
  protected readonly stringifyTemperature = (item: number) => {
    return (((item) / multiplyCoefficient).toFixed(1)).toString() + 'ºC'
  }
}
