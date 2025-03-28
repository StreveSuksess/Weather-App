import { HttpInterceptorFn, HttpRequest } from '@angular/common/http'
import { environment } from '../../../environments/environment.development'

export const weatherInterceptor: HttpInterceptorFn = (req, next) => {
  console.log(req)
  return next(addToken(req))
}

const addToken = (req: HttpRequest<unknown>) => {
  return req.clone({
    params: req.params.set('key', environment.apiKey)
  })
}
