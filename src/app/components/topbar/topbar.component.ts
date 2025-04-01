import { Component } from '@angular/core'
import { TuiTab, TuiTabsWithMore } from '@taiga-ui/kit'
import { RouterLink, RouterLinkActive } from '@angular/router'
import { TuiItem } from '@taiga-ui/cdk'

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [
    TuiTab,
    RouterLink,
    TuiTabsWithMore,
    TuiItem,
    RouterLinkActive
  ],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent {
  protected readonly menuItems: { text: string, url: string }[] = [
    { text: 'Current', url: 'home' },
    { text: 'History', url: 'history' }
  ]
}
