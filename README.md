# Linear Indeterminate Progress Bar using css

This project explains hoe to implement a material like progress bar in angular. The solution includes pure CSS to create the progress bar and the logic to display the same on every api request using interceptor.

## Progress Bar component
### progress-bar.component.html
```html
<div class="progress" *ngIf="isProgressbarLoading">
    <div class="indeterminate"></div>
</div>
```
### progress-bar.component.ts
```
import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { ProgressBarService } from 'src/app/services/progress-bar.service';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {
  isProgressbarLoading = false;
  constructor(private readonly progressbarService: ProgressBarService) { }

  ngOnInit(): void {
    this.progressbarService.getProgressBarStatus().pipe(delay(0)).subscribe((progressBarStatus) => {
      this.isProgressbarLoading = progressBarStatus;
    })
  }
}

```
### progress-bar.component.scss
```
.progress {
  position: fixed;
  height: 4px;
  display: block;
  width: 100%;
  background-color: #acece6;
  border-radius: 2px;
  background-clip: padding-box;
  overflow: hidden;

  .indeterminate {
    background-color: #26a69a;
  }

  .indeterminate:before {
    content: '';
    position: absolute;
    background-color: inherit;
    top: 0;
    left: 0;
    bottom: 0;
    will-change: left, right;
    -webkit-animation: indeterminate 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
    animation: indeterminate 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
  }

  .indeterminate:after {
    content: '';
    position: absolute;
    background-color: inherit;
    top: 0;
    left: 0;
    bottom: 0;
    will-change: left, right;
    -webkit-animation: indeterminate-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
    animation: indeterminate-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
    -webkit-animation-delay: 1.15s;
    animation-delay: 1.15s;
  }
}

@-webkit-keyframes indeterminate {
  0% {
    left: -35%;
    right: 100%;
  }

  60% {
    left: 100%;
    right: -90%;
  }

  100% {
    left: 100%;
    right: -90%;
  }
}

@keyframes indeterminate {
  0% {
    left: -35%;
    right: 100%;
  }

  60% {
    left: 100%;
    right: -90%;
  }

  100% {
    left: 100%;
    right: -90%;
  }
}

@-webkit-keyframes indeterminate-short {
  0% {
    left: -200%;
    right: 100%;
  }

  60% {
    left: 107%;
    right: -8%;
  }

  100% {
    left: 107%;
    right: -8%;
  }
}

@keyframes indeterminate-short {
  0% {
    left: -200%;
    right: 100%;
  }

  60% {
    left: 107%;
    right: -8%;
  }

  100% {
    left: 107%;
    right: -8%;
  }
}

```

### Progress bar service
```
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {
  private isProgressBarLoading$ = new BehaviorSubject<boolean>(false);
  constructor() { }

  setProgressBarStatus(status: boolean): void {
    this.isProgressBarLoading$.next(status);
  }

  getProgressBarStatus(): Observable<boolean> {
    return this.isProgressBarLoading$;
  }
}
```

### App component
Add progress bar component to App component
```
<app-progress-bar></app-progress-bar>
```

### And finally the interceptor
```
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
```
### Register the interceptor in Module and thats it
```
 providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiRequestInterceptor,
      multi: true
    }
  ],
```

