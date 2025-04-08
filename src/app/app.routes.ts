import { Routes } from '@angular/router'
import { HistoryPageComponent, HomePageComponent } from 'pages'

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'history', component: HistoryPageComponent }
]
