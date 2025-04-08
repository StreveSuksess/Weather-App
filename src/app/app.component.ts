import { TUI_DARK_MODE, TuiAppearance, TuiRoot, TuiTitle } from '@taiga-ui/core'
import { Component, inject } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { TuiCardLarge, TuiHeader } from '@taiga-ui/layout'
import { FormsModule } from '@angular/forms'
import { TopbarComponent } from '../widgets'
import { ThemeTogglerComponent } from '../features'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TuiRoot, TuiHeader, TuiTitle, TuiAppearance, TuiCardLarge, FormsModule, TopbarComponent, ThemeTogglerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'weather-app'
  protected readonly darkMode = inject(TUI_DARK_MODE)
}
