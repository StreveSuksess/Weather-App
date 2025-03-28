import { Component, computed, inject, signal } from '@angular/core'
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { TuiAlertService, TuiButton, TuiIcon, TuiPopup, TuiTextfieldOptionsDirective, TuiTitle } from '@taiga-ui/core'
import { TuiDataListWrapper, TuiDataListWrapperComponent, TuiDrawer, TuiFilterByInputPipe } from '@taiga-ui/kit'
import { TuiCell, TuiHeader } from '@taiga-ui/layout'
import { CityStateService } from '../../state/city-state.service'
import { TuiComboBoxModule } from '@taiga-ui/legacy'
import { TuiDropdownMobile } from '@taiga-ui/addon-mobile'

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
    TuiCell,
    TuiComboBoxModule,
    TuiDataListWrapperComponent,
    TuiDropdownMobile,
    TuiFilterByInputPipe,
    FormsModule,
    TuiTextfieldOptionsDirective,
    TuiDataListWrapper
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export default class SidebarComponent {
  private readonly alerts = inject(TuiAlertService)
  protected cityState = inject(CityStateService)
  protected readonly control = new FormControl('Some value')
  protected readonly open = signal(false)
  protected searchCityInput = ''
  protected cities = computed(() => {
    return [
      'Boston', 'Miami', 'Bangladesh'
    ].filter(city => !this.cityState.followedCities.includes(city))
  })

  private showNotification(title: string, subtitle: string): void {
    this.alerts
      .open(title, {
        label: subtitle,
        appearance: 'warning',
        icon: '@tui.info',
        autoClose: 2500
      })
      .subscribe()
  }

  protected onChangeSearchCityInput = (city: string) => {
    if (!this.cities().includes(city)) {
      this.showNotification('Please select a city from the list', '')
      return
    }

    this.cityState.followCity(city)
    this.searchCityInput = ''
  }

  protected onClose(): void {
    if (this.control.pristine) {
      this.open.set(false)

      return
    }
  }
}
