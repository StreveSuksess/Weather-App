import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { TuiTitle } from '@taiga-ui/core'
import { TuiHeader } from '@taiga-ui/layout'

@Component({
  selector: 'app-card',
  imports: [
    TuiHeader,
    TuiTitle
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
  @Input() value!: string
  @Input() title!: string
}
