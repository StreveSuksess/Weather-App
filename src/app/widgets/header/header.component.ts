import { Component, inject } from '@angular/core'
import SidebarComponent from '../sidebar/sidebar.component'
import { TuiTitle } from '@taiga-ui/core'
import { TuiComboBoxModule } from '@taiga-ui/legacy'
import { FormsModule } from '@angular/forms'
import { CityStateService } from '@app/shared'
import { SearchFollowedCityComponent } from '@app/features'

@Component({
  selector: 'app-header',
  imports: [
    SidebarComponent,
    TuiTitle,
    TuiComboBoxModule,
    FormsModule,
    SearchFollowedCityComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  protected cityState = inject(CityStateService)
}
