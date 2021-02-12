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
