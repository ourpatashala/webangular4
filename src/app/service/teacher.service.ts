import { Injectable } from '@angular/core';
import {AngularFire} from "angularfire2";

import {AngularFireAuth, EmailPasswordCredentials} from 'angularfire2/auth';


import {PathUtil} from "../util/PathUtil";
import {TeacherVO} from "../vo/TeacherVO";
import {TeacherError} from "../error/TeacherError";

@Injectable()
export class TeacherService {

  firebaseApp: any;
  angularFireAuth: any;

  constructor(af: AngularFire,afAuth:AngularFireAuth) {
    this.firebaseApp =af;
    this.angularFireAuth = afAuth;



  }

  addTeacherProfile(schoolId : string,teacherVO: TeacherVO) {
    try {
      console.log("Teacher profile path.." + PathUtil.getTeacherProfilePathInSchool(schoolId, teacherVO.id));
      this.signup('helloravisha@gmail.com','Welcome1');
      //throw new TeacherError('Error adding Teacher Info11');
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





  signup(email: string, password: string) {
  //  const credential = this.angularFireAuth.auth..credential(email, password);
    //var credential : EmailPasswordCredentials = { email : 'test@test.com', password: '12345' };
    this.angularFireAuth.
      Auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });
  }


}
