import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private isLoading = false;

  constructor(private spinnerService: SpinnerService) {}

  ngOnInit() {
    this.subscription = this.spinnerService.getSpinner().subscribe((result) => {
      console.log('init');
      console.log(result.display);
      this.isLoading = result.display;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
