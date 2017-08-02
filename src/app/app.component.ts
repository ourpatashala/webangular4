import {Component, Pipe, PipeTransform} from '@angular/core';
//import { Message } from 'primeng/primeng';
import { NotificationService } from './error/handler/NotificationService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

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


@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
  transform(value, args:string[]) : any {
    let keys = [];
    for (let key in value) {
      keys.push({key: key, value: value[key]});
    }
    return keys;
  }
}
