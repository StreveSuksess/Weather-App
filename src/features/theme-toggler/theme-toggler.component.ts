import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { TuiSwitch } from '@taiga-ui/kit'
import { TUI_DARK_MODE } from '@taiga-ui/core'

@Component({
  selector: 'app-theme-toggler',
  imports: [
    ReactiveFormsModule,
    TuiSwitch,
    FormsModule
  ],
  templateUrl: './theme-toggler.component.html',
  styleUrl: './theme-toggler.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeTogglerComponent {
  protected readonly darkMode = inject(TUI_DARK_MODE)
}
