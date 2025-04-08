import { HttpInterceptorFn, HttpRequest } from '@angular/common/http'
import { environment } from '../../environments/environment.development'

export const weatherInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.startsWith(environment.baseWeatherApiUrl)) return next(req)

  return next(addToken(req))
}

const addToken = (req: HttpRequest<unknown>) => {
  return req.clone({
    params: req.params.set('key', environment.weatherApiKey)
  })
}
