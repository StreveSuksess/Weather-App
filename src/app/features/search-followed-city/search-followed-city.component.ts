import { Component, inject } from '@angular/core'
import { TuiComboBoxModule } from '@taiga-ui/legacy'
import { TuiDataListWrapper, TuiDataListWrapperComponent, TuiFilterByInputPipe } from '@taiga-ui/kit'
import { TuiDropdownMobile } from '@taiga-ui/addon-mobile'
import { CityStateService } from '../../shared'
import { FormsModule } from '@angular/forms'
import { TuiTextfieldOptionsDirective } from '@taiga-ui/core'

@Component({
  selector: 'app-search-followed-city',
  imports: [
    TuiComboBoxModule,
    TuiDataListWrapperComponent,
    TuiDropdownMobile,
    TuiFilterByInputPipe,
    FormsModule,
    TuiTextfieldOptionsDirective,
    TuiDataListWrapper
  ],
  templateUrl: './search-followed-city.component.html',
  styleUrl: './search-followed-city.component.css'
})
export class SearchFollowedCityComponent {
  protected cityState = inject(CityStateService)
}
