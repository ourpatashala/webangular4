import { Injectable } from '@angular/core';
import {AngularFire} from "angularfire2";
import {PathUtil} from "../util/PathUtil";
import {TeacherVO} from "../vo/TeacherVO";

@Injectable()
export class TeacherService {

  firebaseApp: any;

  constructor(af: AngularFire) {
    this.firebaseApp =af;
  }

  addTeacherProfile(schoolId : string,teacherVO: TeacherVO){
    console.log("Teacher profile path.."+PathUtil.getTeacherProfilePathInSchool(schoolId,teacherVO.id));
    this.firebaseApp.database.object(PathUtil.getTeacherProfilePathInSchool(schoolId,teacherVO.id)).set(teacherVO)
      .then(
        () => alert('Teacher Info added !')
      );

  }

}
