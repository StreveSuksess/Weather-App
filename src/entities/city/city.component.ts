import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core'
import { TuiButton, TuiIcon, TuiTitle } from '@taiga-ui/core'
import { TuiCell } from '@taiga-ui/layout'
import { CityStateService } from '../../shared'

@Component({
  selector: 'app-city',
  imports: [
    TuiButton,
    TuiCell,
    TuiIcon,
    TuiTitle
  ],
  templateUrl: './city.component.html',
  styleUrl: './city.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CityComponent {
  @Input() city!: string

  protected cityState = inject(CityStateService)

}
