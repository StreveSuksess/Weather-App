import { Routes } from '@angular/router'
import { HomePageComponent } from './pages/home-page/home-page.component'
import { HistoryPageComponent } from './pages/history-page/history-page.component'

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'history', component: HistoryPageComponent }
]
