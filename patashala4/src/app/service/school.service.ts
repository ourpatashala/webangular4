import {Injectable} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase/app';


import {PathUtil} from "../util/PathUtil";
import {SchoolProfileVO} from "../vo/SchoolProfileVO";
import {NodeConstants} from "../constants/NodeConstants";
import {SchoolComponentInterface} from "../component/school/SchoolComponentInterface";
import {Messages} from "../constants/Messages";
import {FirebaseObjectObservable} from "angularfire2/database/firebase_object_observable";
import {MessageTO} from "../to/MessageTO";

@Injectable()
export class SchoolService {

  firebaseApp: any;
  firebaseObject: any;
  count: number;
  angularFireDatabase: AngularFireDatabase;
  angularFireAuth: AngularFireAuth;

  constructor(angularFireDatabase: AngularFireDatabase, angularFireAuth: AngularFireAuth) {
    this.angularFireDatabase = angularFireDatabase;
    this.angularFireAuth = angularFireAuth;
    this.count = 0;

  }

  addSchoolProfile(schoolProfileVO: SchoolProfileVO, schoolComponentInterface: SchoolComponentInterface) {
    this.searchAndAddSchoolProfile(schoolProfileVO, schoolComponentInterface);

  }

  updateSchoolProfile(schoolProfileVO: SchoolProfileVO, schoolComponentInterface: SchoolComponentInterface) {
    var firebaseObject = this.angularFireDatabase;
    var messageTO = new MessageTO();
    messageTO.serviceClassName = "SchoolService";
    messageTO.serviceMethodName = "updateSchoolProfile()";
    var ref = this.angularFireDatabase.object(NodeConstants.SCHOOLS).$ref.child(PathUtil.getSchoolProfileNode()).orderByChild(NodeConstants.UNIQUE_ID).equalTo(schoolProfileVO.uniqueId).once("value", function (snapshot) {
      var exists = (snapshot.val() !== null);
      if (exists) {
        console.log("Record Exists, So validate if the id is matching otherwise don't update the record.")
        // if the  existing record id and your id from UI are equal, then only update the DB , else dont update because that's not your record.
        var dbRecord = snapshot.val();
        Object.keys(dbRecord).forEach(function (key) {
          let schoolVOFromDB = dbRecord[key];

          console.log("schoolVOFromDB.schoolId : " + schoolVOFromDB.schoolId + " schoolProfileVO.schoolId : " + schoolProfileVO.schoolId);

          if (schoolVOFromDB.schoolId == schoolProfileVO.schoolId) {
            var dbRef = firebaseObject.object(PathUtil.getSchoolProfilePath() + schoolProfileVO.schoolId).$ref;
            dbRef.set(schoolProfileVO);

            messageTO.messageInfo = Messages.SCHOOL_UPDATED;
            schoolComponentInterface.successMessageCallBack(messageTO);
            return;
          } else {

            messageTO.messageInfo = Messages.SCHOOL_EXISTS;

            schoolComponentInterface.errorMessageCallBack(messageTO);

          }
        });


      } else {
        console.log("You are trying to update the school with a school name which is not there in DB. ");
        var dbRef = firebaseObject.object(PathUtil.getSchoolProfilePath() + schoolProfileVO.schoolId).$ref;
        dbRef.set(schoolProfileVO);
        messageTO.messageInfo = Messages.SCHOOL_UPDATED;

        schoolComponentInterface.successMessageCallBack(messageTO);
      }
    });


  }

  deleteSchoolProfile(schoolid: string, schoolComponentInterface: SchoolComponentInterface) {

    var firebaseObject = this.angularFireDatabase;
    var messageTO = new MessageTO();
    messageTO.serviceClassName = "SchoolService";
    messageTO.serviceMethodName = "deleteSchoolProfile()";

    var users = firebaseObject.object(NodeConstants.SCHOOLS).$ref.child("/");

    users.once('value', function(snapshot) {
      if (!snapshot.hasChild(schoolid)) {
        firebaseObject.object(PathUtil.getSchoolIdProfilePath(schoolid)).$ref.remove();
        messageTO.messageInfo = Messages.SCHOOL_DELETED;
        schoolComponentInterface.successMessageCallBack(messageTO);
        console.log("School Deleted !!!")
      }
      else {
        messageTO.messageInfo = Messages.SCHOOL_DELETED_DENIED;
        schoolComponentInterface.errorMessageCallBack(messageTO);
        console.log("School Not Deleted !!!")
      }
    });

  }


  getSchoolProfile(schoolId: string): FirebaseObjectObservable<any> {
    var schoolProfilePath = PathUtil.getSchoolProfilePath();
    var schoolInfo = this.angularFireDatabase.object(schoolProfilePath + schoolId);
    return schoolInfo;
  }


  getAllSchoolProfile(): FirebaseListObservable<any> {
    var schoolProfilePath = PathUtil.getSchoolProfilePath();
    var allSchoolProfileInfo = this.angularFireDatabase.list(schoolProfilePath);
    return allSchoolProfileInfo;
  }

  getSchoolProfileRange(start: string, end: string) {
    var schoolProfilePath = PathUtil.getSchoolProfilePath();

    var ref = this.angularFireDatabase.list(NodeConstants.SCHOOLS + PathUtil.getSchoolProfileNode()).$ref.orderByChild(NodeConstants.SCHOOL_NAME).limitToLast(2).startAt(0).once("value", function (snapshot) {
      var dbRecord = snapshot.val();
      Object.keys(dbRecord).forEach(function (key) {
        let schoolVOFromDB = dbRecord[key];
        console.log(schoolVOFromDB.schoolName);

      });

    });

  }


  searchAndAddSchoolProfile(schoolProfileVO: SchoolProfileVO, schoolComponentInterface: SchoolComponentInterface) {
    var schoolProfilePath = PathUtil.getSchoolProfilePath();
    var messageTO = new MessageTO();
    messageTO.serviceClassName = "SchoolService";
    messageTO.serviceMethodName = "searchAndAddSchoolProfile()";

    console.log("entered searchAndAddSchoolProfile.." + schoolProfileVO);
    var firebaseObject = this.angularFireDatabase;
    var ref = this.angularFireDatabase.object(NodeConstants.SCHOOLS).$ref.child(PathUtil.getSchoolProfileNode()).orderByChild(NodeConstants.UNIQUE_ID).equalTo(schoolProfileVO.uniqueId).once("value", function (snapshot) {
      var exists = (snapshot.val() !== null);
      if (exists) {
        console.log("Record already exists..");
        messageTO.messageInfo = Messages.SCHOOL_EXISTS;

        schoolComponentInterface.errorMessageCallBack(messageTO);

      } else {
        console.log("Record not existed..");
        var dbRef = firebaseObject.object(PathUtil.getSchoolProfilePath()).$ref.push(PathUtil.getSchoolProfilePath());
        schoolProfileVO.schoolId = dbRef.key;
        dbRef.set(schoolProfileVO);
        messageTO.messageInfo = Messages.SCHOOL_ADDED;
        messageTO.objId = schoolProfileVO.schoolId;
        schoolComponentInterface.successMessageCallBack(messageTO);
      }
    });


  }


}
