import { Component, inject } from '@angular/core'
import SidebarComponent from '../sidebar/sidebar.component'
import { TuiTextfieldOptionsDirective, TuiTitle } from '@taiga-ui/core'
import { TuiComboBoxModule } from '@taiga-ui/legacy'
import { FormsModule } from '@angular/forms'
import { TuiDropdownMobile } from '@taiga-ui/addon-mobile'
import { TuiDataListWrapper, TuiDataListWrapperComponent, TuiFilterByInputPipe } from '@taiga-ui/kit'
import { CityStateService } from '../../state/city-state.service'

@Component({
  selector: 'app-home-page-header',
  imports: [
    SidebarComponent,
    TuiTitle,
    TuiComboBoxModule,
    TuiTextfieldOptionsDirective,
    FormsModule,
    TuiDropdownMobile,
    TuiDataListWrapperComponent,
    TuiDataListWrapper,
    TuiFilterByInputPipe
  ],
  templateUrl: './home-page-header.component.html',
  styleUrl: './home-page-header.component.css'
})
export class HomePageHeaderComponent {
  protected cityState = inject(CityStateService)
}
