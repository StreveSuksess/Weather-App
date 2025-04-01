import { Component, computed, input, Input, Signal } from '@angular/core'
import IForecastWeather from '../../../data/interfaces/responseWeather.interface'
import { TuiPoint, TuiTitle } from '@taiga-ui/core'
import { TuiAxes, TuiLineChart } from '@taiga-ui/addon-charts'
import { TuiHeader } from '@taiga-ui/layout'

const multiplyCoefficient = 30
const amortizationCoefficient = 20
const countLines = 5

@Component({
  selector: 'app-card-days-forecast',
  imports: [
    TuiAxes,
    TuiHeader,
    TuiLineChart,
    TuiTitle
  ],
  templateUrl: './card-days-forecast.component.html',
  styleUrl: './card-days-forecast.component.css'
})
export class CardDaysForecastComponent {
  weatherData = input<IForecastWeather>()
  @Input() title!: string
  @Input() countDays!: number
  @Input() direction!: 'forward' | 'backward'

  protected readonly forecastDays = computed(() => {
    if (this.weatherData() !== undefined) {
      return this.weatherData()!.forecast.forecastday
    }
    return []
  })

  protected temperatureForecastDays: Signal<TuiPoint[]> = computed(() => {
    return this.forecastDays().map((day, index) => [index, (day.day.maxtemp_c * multiplyCoefficient)])
  })
  protected minY = computed(() => {
    return Math.min(...this.temperatureForecastDays().map((temperatureForecastDay) => temperatureForecastDay[1])) - amortizationCoefficient
  })
  protected maxY = computed(() => {
    return Math.max(...this.temperatureForecastDays().map((temperatureForecastDay) => temperatureForecastDay[1])) + amortizationCoefficient
  })

  protected axisXLabels: string[] = []
  protected axisYLabels = computed(() => {
    const min = this.minY()
    const max = this.maxY()
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
    const today = new Date()

    if (this.direction === 'forward') {
      for (let i = 0; i < this.countDays; i++) {
        const nextDay = new Date(today)
        nextDay.setDate(today.getDate() + i)

        const day = String(nextDay.getDate()).padStart(2, '0')
        const month = String(nextDay.getMonth() + 1).padStart(2, '0')

        this.axisXLabels.push(`${day}.${month}`)
      }
    } else {
      for (let i = this.countDays; i > 0; i--) {
        const nextDay = new Date(today)
        nextDay.setDate(today.getDate() - i)

        const day = String(nextDay.getDate()).padStart(2, '0')
        const month = String(nextDay.getMonth() + 1).padStart(2, '0')

        this.axisXLabels.push(`${day}.${month}`)
      }
    }
  }


  protected readonly stringifyTime = (item: number) => {
    return this.axisXLabels[item]
  }
  protected readonly stringifyTemperature = (item: number) => {
    return (((item) / multiplyCoefficient).toFixed(1)).toString() + 'ºC'
  }
}
