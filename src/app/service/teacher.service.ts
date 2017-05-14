import { Injectable } from '@angular/core';
import {AngularFire} from "angularfire2";
import {PathUtil} from "../util/PathUtil";
import {TeacherVO} from "../vo/TeacherVO";
import {TeacherError} from "../error/TeacherError";

@Injectable()
export class TeacherService {

  firebaseApp: any;

  constructor(af: AngularFire) {
    this.firebaseApp =af;
  }

  addTeacherProfile(schoolId : string,teacherVO: TeacherVO) {
    try {
      console.log("Teacher profile path.." + PathUtil.getTeacherProfilePathInSchool(schoolId, teacherVO.id));
      throw new TeacherError('Error adding Teacher Info11');
    }catch(teacherError ) {
      throw new TeacherError(teacherError.message);
      /*
       }
       throw new TeacherError('Error adding Teacher Info');/*
       this.firebaseApp.database.object(PathUtil.getTeacherProfilePathInSchool(schoolId,teacherVO.id)).set(teacherVO)
       .then(
       () => alert('Teacher Info added !')
       ); */

    }}

}
