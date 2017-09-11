import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';



import {PathUtil} from "../util/PathUtil";
import {StudentVO} from "../vo/StudentVO";
import {NodeConstants} from "../constants/NodeConstants";
import {StudentComponentInterface} from "../component/student/StudentComponentInterface";
import {Messages} from "../constants/Messages";
import {FirebaseObjectObservable} from "angularfire2/database/firebase_object_observable";

@Injectable()
export class StudentService {

  firebaseApp: any;
  firebaseObject:any;
  count:number;
  angularFireDatabase: AngularFireDatabase;
  angularFireAuth:AngularFireAuth;

  constructor(angularFireDatabase: AngularFireDatabase,angularFireAuth:AngularFireAuth) {
    this.angularFireDatabase = angularFireDatabase;
    this.angularFireAuth = angularFireAuth;
    this.count = 0;

  }

  addStudentProfile(schoolId: string, studentVO: StudentVO, studentComponentInterface: StudentComponentInterface) {

    this.searchAndAddStudent(studentVO, studentComponentInterface);

  }

  getStudentProfile(schoolId: string, studentId: string): FirebaseObjectObservable<any> {
    var studentInfo = this.firebaseApp.database.object("/schools/" + schoolId + "/studentProfile/" + studentId);
    return studentInfo;
  }


  searchAndAddStudent(studentVO: StudentVO, studentComponentInterface: StudentComponentInterface) {

    var studentProfilePath = PathUtil.getStudentPath(studentVO.schoolId);

    console.log("searchAndAddSchoolProfile --> studentProfilePath.." + studentProfilePath);

    console.log("searchAndAddSchoolProfile --> studentVO.schoolId.." + studentVO.schoolId);
    console.log("searchAndAddSchoolProfile --> studentVO.firstName.." + studentVO.firstName);
    console.log("searchAndAddSchoolProfile --> studentVO.lastName.." + studentVO.lastName);
    console.log("searchAndAddSchoolProfile --> studentVO.rollNo.." + studentVO.rollNo);
    console.log("searchAndAddSchoolProfile --> studentVO.uniqueId.." + studentVO.uniqueId);
    var firebaseObject = this.firebaseApp.database;
    var ref = this.firebaseApp.database.object(NodeConstants.STUDENTS).$ref.child(studentProfilePath).orderByChild(NodeConstants.UNIQUE_ID).equalTo(studentVO.uniqueId).once("value", function (snapshot) {
      var exists = (snapshot.val() !== null);
      if (exists) {
        console.log("Record already exists..");
        studentComponentInterface.errorMessageCallBack(Messages.STUDENT_EXISTS);

      } else {
        console.log("Record not existed..");
        var dbRef = firebaseObject.object(studentProfilePath).$ref.push(studentProfilePath);
        studentVO.id = dbRef.key;
        dbRef.set(studentVO);
        studentComponentInterface.successMessageCallBack(Messages.STUDENT_ADDED);
      }
    });

  }


  updateStudentProfile(schoolId: string, studentVO: StudentVO, studentComponentInterface: StudentComponentInterface) {

    var firebaseObject = this.firebaseApp.database;
    var studentProfilePath = PathUtil.getStudentProfilePath(studentVO.schoolId, studentVO.id);
    console.log("updateStudentProfile studentProfilePath ==> "+ studentProfilePath);
    var ref = this.firebaseApp.database.object(NodeConstants.STUDENTS).$ref.child(studentProfilePath).orderByChild(NodeConstants.UNIQUE_ID).equalTo(studentVO.uniqueId).once("value", function (snapshot) {
      var exists = (snapshot.val() !== null);
      if (exists) {
        console.log("Record Exists, So validate if the id is matching otherwise don't update the record.")
        // if the  existing record id and your id from UI are equal, then only update the DB , else dont update because that's not your record.
        var dbRecord = snapshot.val();
        Object.keys(dbRecord).forEach(function (key) {
          let schoolVOFromDB = dbRecord[key];
          if (schoolVOFromDB.id == studentVO.id) {
            var dbRef = firebaseObject.object(studentProfilePath + studentVO.id).$ref;
            dbRef.set(studentVO);
            studentComponentInterface.successMessageCallBack(Messages.STUDENT_UPDATED);
            return;
          }
        });
        studentComponentInterface.errorMessageCallBack(Messages.STUDENT_EXISTS);

      } else {
        console.log("You are trying to update the student with a student name which is not there in DB. ");
        var dbRef = firebaseObject.object(studentProfilePath).$ref;
        dbRef.set(studentVO);
        studentComponentInterface.successMessageCallBack(Messages.STUDENT_UPDATED);
      }
    });

  }




}
