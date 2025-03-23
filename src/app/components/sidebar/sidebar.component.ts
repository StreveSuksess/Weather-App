import { Component, inject, signal } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { TuiButton, TuiDialogService, TuiPopup, TuiTitle } from '@taiga-ui/core'
import { TUI_CONFIRM, TuiDrawer } from '@taiga-ui/kit'
import { TuiHeader } from '@taiga-ui/layout'
import { filter } from 'rxjs'
import { CityStateService } from '../../state/city-state.service'

@Component({
  selector: 'app-sidebar',
  imports: [
    ReactiveFormsModule,
    TuiButton,
    TuiDrawer,
    TuiHeader,
    TuiPopup,
    TuiTitle
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export default class SidebarComponent {
  protected readonly dialogs = inject(TuiDialogService)
  protected cityState = inject(CityStateService)
  protected readonly control = new FormControl('Some value')
  protected readonly open = signal(false)

  public onClose(): void {
    if (this.control.pristine) {
      this.open.set(false)

      return
    }

    this.dialogs
      .open(TUI_CONFIRM, {
        label: 'Cancel editing form?',
        size: 's',
        data: {
          content: 'You have unsaved changes that will be lost'
        }
      })
      .pipe(filter(Boolean))
      .subscribe(() => {
        this.open.set(false)
        this.control.reset('Some value')
      })
  }
}
