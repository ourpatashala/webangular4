/**
 * Created by ravisha on 4/29/17.
 */

import {ErrorHandler, Injectable, Inject} from '@angular/core';
import {TeacherError} from "../TeacherError";
import { NotificationService } from './NotificationService';

@Injectable()
export default class CommonErrorHandler extends ErrorHandler {

  constructor(@Inject(NotificationService) private notificationService: NotificationService) {
    // The true paramter tells Angular to rethrow exceptions, so operations like 'bootstrap' will result in an error
    // when an error happens. If we do not rethrow, bootstrap will always succeed.
    super(true);
  }


  handleError(error) {
    console.log('Exception thrown')
    this.showErrorInConsole(error);

    if (error.originalError instanceof TeacherError) {
      console.info(`[Teacher ERROR]:::${error.originalError.toString()}`);
    } else {
      super.handleError(error);
    }
  }

    //setTimeout(() =>
      //this.notificationService.error(error.json().Message), 1);
  //}


  private showErrorInConsole(error: any) :void {
    if (console && console.group && console.error) {
      //console.group("Error Log");
      //console.error(error);
      console.error(error.message);
      //console.error(error.stack);
      //console.groupEnd();
    }
  }

}

