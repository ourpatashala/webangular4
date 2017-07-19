import { Injectable } from '@angular/core';
import {AngularFire, FirebaseObjectObservable} from "angularfire2";

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

  constructor(af: AngularFire,afAuth:AngularFireAuth) {
    this.firebaseApp =af;
    this.angularFireAuth = afAuth;
  }

  addSchoolProfile(schoolProfileVO: SchoolProfileVO,schoolComponentInterface:SchoolComponentInterface) {
    this.searchAndAddSchoolProfile(schoolProfileVO,schoolComponentInterface);
  }

  updateSchoolProfile(schoolProfileVO: SchoolProfileVO) {
    var dbRef = this.firebaseApp.database.object(PathUtil.getSchoolProfilePath()+schoolProfileVO.schoolId).set(schoolProfileVO);
  }

  deleteSchoolProfile(schoolid: string) {
   this.firebaseApp.database.object(PathUtil.getSchoolIdProfilePath(schoolid)).$ref.remove();
  }


  getSchoolProfile(schoolId : string): FirebaseObjectObservable<any>{
    var schoolProfilePath = PathUtil.getSchoolProfilePath();
    var schoolInfo =  this.firebaseApp.database.object(schoolProfilePath+schoolId);
    return schoolInfo;
  }

  getAllSchoolProfile() : FirebaseObjectObservable<any>{
    var schoolProfilePath = PathUtil.getSchoolProfilePath();
    var allSchoolProfileInfo =  this.firebaseApp.database.object(schoolProfilePath);
    return allSchoolProfileInfo;
  }

  searchAndAddSchoolProfile(schoolProfileVO: SchoolProfileVO,schoolComponentInterface:SchoolComponentInterface){
    var schoolProfilePath = PathUtil.getSchoolProfilePath();
    console.log("entered searchAndAddSchoolProfile.."+schoolProfileVO.uniqueId)
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
