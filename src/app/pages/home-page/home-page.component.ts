import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { TuiComboBoxModule, TuiInputTagModule, TuiTextfieldControllerModule } from '@taiga-ui/legacy'
import { HeaderComponent, TilesComponent } from '@app/widgets'


@Component({
  selector: 'app-home-page',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TuiInputTagModule,
    TuiTextfieldControllerModule,
    TuiComboBoxModule,
    HeaderComponent,
    TilesComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent {
}
