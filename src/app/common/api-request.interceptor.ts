import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, finalize, tap } from 'rxjs/operators';
import { ProgressBarService } from '../services/progress-bar.service';

@Injectable()
export class ApiRequestInterceptor implements HttpInterceptor {

  constructor(private readonly progressbarService: ProgressBarService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.progressbarService.setProgressBarStatus(true);
    return next.handle(request).pipe(
      delay(2000),
      finalize(() => {
        this.progressbarService.setProgressBarStatus(false);
      }));
  }
}
