import { Component, computed, inject, signal } from '@angular/core'
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { TuiComboBoxModule, TuiInputDateRangeModule } from '@taiga-ui/legacy'
import { TuiDataListWrapper, TuiDataListWrapperComponent, TuiFilterByInputPipe } from '@taiga-ui/kit'
import { TuiDropdownMobile } from '@taiga-ui/addon-mobile'
import { debounceTime, distinctUntilChanged, finalize, switchMap, tap } from 'rxjs'
import { TuiAlertService, TuiLoader, TuiTextfieldOptionsDirective } from '@taiga-ui/core'
import { CityStateService, SearchCityService } from '@app/shared'

@Component({
  selector: 'app-search-cities',
  imports: [
    ReactiveFormsModule,
    TuiComboBoxModule,
    TuiDataListWrapperComponent,
    TuiDropdownMobile,
    TuiFilterByInputPipe,
    TuiInputDateRangeModule,
    FormsModule,
    TuiTextfieldOptionsDirective,
    TuiLoader,
    TuiDataListWrapper
  ],
  templateUrl: './search-cities.component.html',
  styleUrl: './search-cities.component.css'
})
export class SearchCitiesComponent {
  private readonly alerts = inject(TuiAlertService)
  protected searchCityService = inject(SearchCityService)
  protected cityState = inject(CityStateService)
  protected citiesLoading = signal<boolean>(true)
  protected baseCities = signal<string[]>([])
  protected cities = computed(() => {
    return this.baseCities().filter(city => !this.cityState.followedCities.includes(city))
  })

  protected readonly searchControl = new FormControl('')
  protected searchCityInput = ''

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
  content: any
  context: any


  protected strictMatcher() {
    return false
  }
}
