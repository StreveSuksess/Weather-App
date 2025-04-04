import { Component, inject, signal } from '@angular/core'
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { TuiButton, TuiDurationOptions, TuiIcon, TuiPopup, TuiTitle } from '@taiga-ui/core'
import { TuiDrawer } from '@taiga-ui/kit'
import { TuiHeader } from '@taiga-ui/layout'
import { CityStateService } from '@app/shared'
import { TuiComboBoxModule } from '@taiga-ui/legacy'
import { tuiPure } from '@taiga-ui/cdk'
import { SearchCitiesComponent } from '@app/features'
import { CityComponent } from '@app/entities'

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
    TuiComboBoxModule,
    FormsModule,
    SearchCitiesComponent,
    CityComponent
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export default class SidebarComponent {
  protected cityState = inject(CityStateService)
  protected readonly control = new FormControl('')
  protected readonly open = signal(false)

  protected onClose(): void {
    if (this.control.pristine) {
      this.open.set(false)
    }
  }

  @tuiPure
  protected getAnimation(duration: number): TuiDurationOptions {
    return { value: '', params: { duration } }
  }
}
