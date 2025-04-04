import { Component } from '@angular/core'
import { HeaderComponent, HistoryWeatherComponent } from '@app/widgets'

@Component({
  selector: 'app-history-page',
  imports: [
    HeaderComponent,
    HistoryWeatherComponent
  ],
  templateUrl: './history-page.component.html',
  styleUrl: './history-page.component.css'
})
export class HistoryPageComponent {
}
