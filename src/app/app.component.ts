import { TUI_DARK_MODE, TuiAppearance, TuiRoot, TuiTitle } from '@taiga-ui/core'
import { Component, inject } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { TuiCardLarge, TuiHeader } from '@taiga-ui/layout'
import { TuiSwitch } from '@taiga-ui/kit'
import { FormsModule } from '@angular/forms'
import { TopbarComponent } from './widgets/topbar/topbar.component'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TuiRoot, TuiHeader, TuiTitle, TuiAppearance, TuiCardLarge, TuiSwitch, FormsModule, TopbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'weather-app'
  protected readonly darkMode = inject(TUI_DARK_MODE)

}
