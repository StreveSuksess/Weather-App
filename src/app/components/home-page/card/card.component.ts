import { Component, Input } from '@angular/core'
import { TuiTextfieldOptionsDirective, TuiTitle } from '@taiga-ui/core'
import { TuiHeader } from '@taiga-ui/layout'

@Component({
  selector: 'app-card',
  imports: [
    TuiHeader,
    TuiTitle,
    TuiTextfieldOptionsDirective

  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() value!: string
  @Input() title!: string
}
