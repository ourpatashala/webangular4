import { Component } from '@angular/core';
//import { Message } from 'primeng/primeng';
import { NotificationService } from './error/handler/NotificationService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(){

  }

  /*
  constructor(private notification: NotificationService) {
  }


  getMessages(): Message[] {
    return this.notification.message;
  }*/
}
