import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http'
import { inject } from '@angular/core'
import { Observable, finalize } from 'rxjs'
import { LoadingService } from '../services/loading.service'

let totalRequests = 0

export const LoadingInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  const loadingService = inject(LoadingService)

  totalRequests++
  loadingService.setLoading(true)

  return next(request).pipe(
    finalize(() => {
      totalRequests--
      if (totalRequests === 0) {
        loadingService.setLoading(false)
      }
    }),
  )
}
