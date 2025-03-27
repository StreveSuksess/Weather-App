import { Component, inject, signal } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { TuiButton, TuiIcon, TuiPopup, TuiTitle } from '@taiga-ui/core'
import { TuiDrawer } from '@taiga-ui/kit'
import { TuiCell, TuiHeader } from '@taiga-ui/layout'
import { CityStateService } from '../../state/city-state.service'

@Component({
  selector: 'app-sidebar',
  imports: [
    ReactiveFormsModule,
    TuiButton,
    TuiDrawer,
    TuiHeader,
    TuiPopup,
    TuiTitle,
    TuiIcon,
    TuiCell
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export default class SidebarComponent {
  protected cityState = inject(CityStateService)
  protected readonly control = new FormControl('Some value')
  protected readonly open = signal(false)

  public onClose(): void {
    if (this.control.pristine) {
      this.open.set(false)

      return
    }
  }
}
