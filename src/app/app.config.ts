import { NG_EVENT_PLUGINS } from '@taiga-ui/event-plugins'
import { provideAnimations } from '@angular/platform-browser/animations'
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core'
import { provideRouter } from '@angular/router'

import { routes } from './app.routes'
import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { weatherInterceptor } from './data/interceptors/weather.interceptor'

export const appConfig: ApplicationConfig = {
  providers: [provideAnimations(), provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), NG_EVENT_PLUGINS, provideHttpClient(withInterceptors([weatherInterceptor]))]
}
