import { Component, computed, inject, signal } from '@angular/core'
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import {
  TuiAlertService,
  TuiButton,
  TuiDurationOptions,
  TuiIcon,
  TuiLoader,
  TuiPopup,
  TuiTextfieldOptionsDirective,
  TuiTitle
} from '@taiga-ui/core'
import { TuiDataListWrapper, TuiDataListWrapperComponent, TuiDrawer, TuiFilterByInputPipe } from '@taiga-ui/kit'
import { TuiCell, TuiHeader } from '@taiga-ui/layout'
import { CityStateService } from '../../shared/state/city-state.service'
import { TuiComboBoxModule } from '@taiga-ui/legacy'
import { TuiDropdownMobile } from '@taiga-ui/addon-mobile'
import { SearchCityService } from '../../shared/api/services/search-city.service'
import { debounceTime, distinctUntilChanged, finalize, switchMap, tap } from 'rxjs'
import { tuiPure } from '@taiga-ui/cdk'

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
    FormsModule,
    TuiTextfieldOptionsDirective,
    TuiDataListWrapper,
    TuiLoader,
    TuiFilterByInputPipe
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export default class SidebarComponent {
  private readonly alerts = inject(TuiAlertService)
  protected cityState = inject(CityStateService)
  protected searchCityService = inject(SearchCityService)

  protected readonly control = new FormControl('')
  protected readonly searchControl = new FormControl('')
  protected readonly open = signal(false)
  protected searchCityInput = ''
  protected citiesLoading = signal<boolean>(true)
  protected baseCities = signal<string[]>([])
  protected cities = computed(() => {
    return this.baseCities().filter(city => !this.cityState.followedCities.includes(city))
  })

  ngOnInit(): void {
    this.searchCityService.searchCity('').pipe(finalize(() => {
      this.citiesLoading.set(false)
    })).subscribe((response: any) => {
      this.baseCities.set(response)
    })

    this.searchControl.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      tap(() => {
        this.citiesLoading.set(true)
      }),
      switchMap(query => {
        return this.searchCityService.searchCity(query ?? '').pipe(finalize(() => {
          this.citiesLoading.set(false)
        }))
      })
    ).subscribe((response: any) => {
      this.baseCities.set(response)
    })
  }

  protected onChangeSearchCityInput = (city: string) => {
    if (!this.cities().includes(city)) {
      return
    }

    this.searchCityInput = ''
    this.searchControl.setValue('')
    this.cityState.followCity(city)
    this.cityState.selectedCity = city
  }

  protected onClose(): void {
    if (this.control.pristine) {
      this.open.set(false)
    }
  }

  protected strictMatcher() {
    return false
  }

  @tuiPure
  protected getAnimation(duration: number): TuiDurationOptions {
    return { value: '', params: { duration } }
  }
}
