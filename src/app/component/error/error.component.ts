import {Component, OnInit, OnDestroy} from '@angular/core';
import { ErrorService } from '../../service/error.service';
import { Subscription } from 'rxjs/Subscription';
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})


export class ErrorComponent implements OnDestroy {
  message: string = '';
  subscription: Subscription;
  constructor(private errorService: ErrorService) {
    this.subscription = this.errorService.update$.subscribe(
      message => {
        this.message = message;
      });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}


 /*
 ngOnInit() {
 this.route
 .queryParams
 .subscribe(params => {
 this.code = params['code'];
 this.userEmail = params['email'];
 });
 } */

