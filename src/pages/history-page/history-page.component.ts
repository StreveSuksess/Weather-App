import { ChangeDetectionStrategy, Component } from '@angular/core'
import { HeaderComponent, HistoryWeatherComponent } from '../../widgets'

@Component({
  selector: 'app-history-page',
  imports: [
    HeaderComponent,
    HistoryWeatherComponent
  ],
  templateUrl: './history-page.component.html',
  styleUrl: './history-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryPageComponent {
}
