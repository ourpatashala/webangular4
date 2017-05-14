/**
 * Created by ravisha on 4/29/17.
 */

import {ErrorHandler, Injectable, Inject, Injector} from '@angular/core';
import {TeacherError} from "../TeacherError";
import { NotificationService } from './NotificationService';
import {Router} from "@angular/router";
import {ErrorService} from "../../service/error.service";


@Injectable()
export default class CommonErrorHandler extends ErrorHandler {

  constructor(@Inject(NotificationService) private notificationService: NotificationService,private errorService: ErrorService,
              private injector: Injector) {
    // The true paramter tells Angular to rethrow exceptions, so operations like 'bootstrap' will result in an error
    // when an error happens. If we do not rethrow, bootstrap will always succeed.
    super(true);
  }

  public getRouter():Router{
     return this.injector.get(Router);
  }

  handleError(error) {
    console.info(`Exception thrown :: ${error.originalError.toString()}`);
    this.errorService.updateMessage(error.originalError.toString());
    this.getRouter().navigate(['/error']);
  }
}


/*  Notes Begin


How to throw Error:


 addTeacherProfile(schoolId : string,teacherVO: TeacherVO) {
 try {
 console.log("Teacher profile path.." + PathUtil.getTeacherProfilePathInSchool(schoolId, teacherVO.id));
 throw new TeacherError('Error adding Teacher Info11');
 }catch(teacherError ) {
 throw new TeacherError(teacherError.message);
 /*
 }
 throw new TeacherError('Error adding Teacher Info');/*


}}

//setTimeout(() =>
//this.notificationService.error(error.json().Message), 1);
//}



 if (error.originalError instanceof TeacherError) {
 console.info(`[Teacher ERROR]:::${error.originalError.toString()}`);
 this.errorService.updateMessage('Custom error message');
 this.getRouter().navigate(['/error']);
 // this.getRouter().navigate(['/error'],
 // {queryParams: {errorMessage: '${error.originalError.toString()}', code: 'Error01'}});

 } else {
 super.handleError(error);
 }



 private showErrorInConsole(error: any): void {
 if (console && console.group && console.error) {
 //console.group("Error Log");
 //console.error(error);
 console.error(error.message);
 //console.error(error.stack);
 //console.groupEnd();
 }
 }

Notes End.
 */

