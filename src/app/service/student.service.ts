import { Injectable } from '@angular/core';

import {FirebaseApp, FirebaseObjectObservable} from 'angularfire2';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import {angularFireModule} from "../app.module";
import {databaseFB} from "../app.module";
import 'rxjs/add/operator/catch'
import {Response} from "@angular/http";
import {StudentVO} from "../vo/StudentVO";
import {PathUtil} from "../util/PathUtil";




@Injectable()
export class StudentService {

  firebaseApp: any;

  constructor(af: AngularFire) {
    this.firebaseApp =af;
  }

  addStudentProfile(schoolId : string,studentVO: StudentVO){
    this.firebaseApp.database.object(PathUtil.getStudentProfilePath(schoolId,studentVO.id)).set(studentVO)
      .then(
        () => alert('student Info added !')
      );

  }

  getStudentProfile(schoolId : string,studentId: string ): FirebaseObjectObservable<any>{
      var studentInfo =  this.firebaseApp.database.object('/schools/'+schoolId+'/studentProfile');
      return studentInfo.catch(this._errorHandler);
  }

  _errorHandler(error:Response){
     console.error(error)
    return FirebaseObjectObservable.throw(error|| "server Error")
  }

}
