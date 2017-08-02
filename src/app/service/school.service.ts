import { Injectable } from '@angular/core';
import {AngularFire, FirebaseObjectObservable, FirebaseListObservable} from "angularfire2";

import {AngularFireAuth} from 'angularfire2/auth';


import {PathUtil} from "../util/PathUtil";
import {SchoolProfileVO} from "../vo/SchoolProfileVO";
import {NodeConstants} from "../constants/NodeConstants";
import {SchoolComponentInterface} from "../component/school/SchoolComponentInterface";
import {SchoolError} from "../error/SchoolError";
import {Messages} from "../constants/Messages";

@Injectable()
export class SchoolService {

  firebaseApp: any;
  angularFireAuth: any;
  firebaseObject:any;

  constructor(af: AngularFire,afAuth:AngularFireAuth) {
    this.firebaseApp =af;
    this.angularFireAuth = afAuth;
    this.firebaseObject = this.firebaseApp.database;

  }

  addSchoolProfile(schoolProfileVO: SchoolProfileVO,schoolComponentInterface:SchoolComponentInterface) {
    this.searchAndAddSchoolProfile(schoolProfileVO,schoolComponentInterface);
  }

  updateSchoolProfile(schoolProfileVO: SchoolProfileVO,schoolComponentInterface:SchoolComponentInterface) {
    var firebaseObject = this.firebaseApp.database;
    var ref = this.firebaseApp.database.object(NodeConstants.SCHOOLS).$ref.child(PathUtil.getSchoolProfileNode()).orderByChild(NodeConstants.UNIQUE_ID).equalTo(schoolProfileVO.uniqueId).once("value", function(snapshot) {
      var exists = (snapshot.val() !== null);
      if(exists) {
        console.log("Record Exists, So validate if the id is matching otherwise don't update the record.")
        // if the  existing record id and your id from UI are equal, then only update the DB , else dont update because that's not your record.
        var dbRecord = snapshot.val();
        Object.keys(dbRecord).forEach(function(key){
          let schoolVOFromDB = dbRecord[key];
          if(schoolVOFromDB.schoolId == schoolProfileVO.schoolId){
            var dbRef = firebaseObject.object(PathUtil.getSchoolProfilePath()+schoolProfileVO.schoolId).$ref;
            dbRef.set(schoolProfileVO);
            schoolComponentInterface.successMessageCallBack(Messages.SCHOOL_UPDATED);
            return;
          }
        });
        throw new SchoolError(Messages.SCHOOL_EXISTS);

      }else{
        console.log("Record not existed..so going and updating the same record..");
        var dbRef = firebaseObject.object(PathUtil.getSchoolProfilePath()+schoolProfileVO.schoolId).$ref;
        dbRef.set(schoolProfileVO);
        schoolComponentInterface.successMessageCallBack(Messages.SCHOOL_UPDATED);
      }
    });




  }

  deleteSchoolProfile(schoolid: string) {
   this.firebaseApp.database.object(PathUtil.getSchoolIdProfilePath(schoolid)).$ref.remove();
  }


  getSchoolProfile(schoolId : string): FirebaseObjectObservable<any>{
    var schoolProfilePath = PathUtil.getSchoolProfilePath();
    var schoolInfo =  this.firebaseApp.database.object(schoolProfilePath+schoolId);
    return schoolInfo;
  }



  getAllSchoolProfile() : FirebaseListObservable<any>{
    var schoolProfilePath = PathUtil.getSchoolProfilePath();
    var allSchoolProfileInfo =  this.firebaseApp.database.list(schoolProfilePath);
    return allSchoolProfileInfo;
  }



  searchAndAddSchoolProfile(schoolProfileVO: SchoolProfileVO,schoolComponentInterface:SchoolComponentInterface){
    var schoolProfilePath = PathUtil.getSchoolProfilePath();
    console.log("entered searchAndAddSchoolProfile.."+schoolProfileVO);
    var firebaseObject = this.firebaseApp.database;
    var ref = this.firebaseApp.database.object(NodeConstants.SCHOOLS).$ref.child(PathUtil.getSchoolProfileNode()).orderByChild(NodeConstants.UNIQUE_ID).equalTo(schoolProfileVO.uniqueId).once("value", function(snapshot) {
      var exists = (snapshot.val() !== null);
      if(exists){
          console.log("Record already exists..");
          throw new SchoolError(Messages.SCHOOL_EXISTS);
      }else{
        console.log("Record not existed..");
        var dbRef = firebaseObject.object(PathUtil.getSchoolProfilePath()).$ref.push(PathUtil.getSchoolProfilePath());
        schoolProfileVO.schoolId = dbRef.key;
        dbRef.set(schoolProfileVO);
        schoolComponentInterface.successMessageCallBack(Messages.SCHOOL_ADDED);
      }
    });


  }







}
