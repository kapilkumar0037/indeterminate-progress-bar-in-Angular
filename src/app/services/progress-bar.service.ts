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
