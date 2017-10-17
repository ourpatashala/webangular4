import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import {MessageTO} from "../to/MessageTO";
import {RegisteredUser} from "../vo/RegisteredUser";
import {RegisteredStudent} from "../vo/RegisteredStudent";
import {SchoolProfileVO} from "../vo/SchoolProfileVO";




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

    studentVO.schoolId = schoolId;
    this.searchAndAddStudent(studentVO, studentComponentInterface);

  }

  getAllStudents(schoolId: string) : FirebaseListObservable<any>{
    var studentProfilePath = PathUtil.getStudentPath(schoolId);
    var allstudentProfiles=  this.angularFireDatabase.list(studentProfilePath);
    return allstudentProfiles;
  }

  getStudentProfileRange(schoolId: string,start:string,end:string){
    var schoolProfilePath = PathUtil.getStudentPath(schoolId);

    var ref = this.angularFireDatabase.list(NodeConstants.SCHOOLS+schoolProfilePath).$ref.orderByChild("firstName").limitToLast(2).startAt(0).once("value", function(snapshot) {
      var dbRecord = snapshot.val();
      Object.keys(dbRecord).forEach(function(key){
        let schoolVOFromDB = dbRecord[key];
        console.log(schoolVOFromDB.firstName);

      });

    });

  }


  getStudentProfile(schoolId: string, studentId: string): FirebaseObjectObservable<any> {
    var studentInfo = this.angularFireDatabase.object("/schools/" + schoolId + "/studentProfile/" + studentId);
    return studentInfo;
  }


  searchAndAddStudent(studentVO: StudentVO, studentComponentInterface: StudentComponentInterface) {



    var serviceObject = this;
    var messageTO = new MessageTO();
    messageTO.serviceClassName = "StudentService";
    messageTO.serviceMethodName = "searchAndAddStudent()";


    var firebaseObject = this.angularFireDatabase;
    var studentProfilePath = PathUtil.getStudentPath(studentVO.schoolId);
    console.log("updateStudentProfile studentProfilePath ==> "+ studentProfilePath);
    var ref = this.angularFireDatabase.object(NodeConstants.SCHOOLS).$ref.child(studentProfilePath).orderByChild(NodeConstants.UNIQUE_ID).equalTo(studentVO.uniqueId).once("value", function (snapshot) {
      var exists = (snapshot.val() !== null);
      if (exists) {
        console.log("Record already exists..");

        messageTO.messageInfo = Messages.STUDENT_EXISTS;

        studentComponentInterface.errorMessageCallBack(messageTO);


      } else {
        console.log("Record not existed.."+studentProfilePath);
        var dbRef = firebaseObject.object(studentProfilePath).$ref.push(studentProfilePath);

        //var dbRef = firebaseObject.object(PathUtil.getSchoolProfilePath()).$ref.push(PathUtil.getSchoolProfilePath());
        studentVO.id = dbRef.key;

        console.log("Record not existed.."+ studentVO);
        dbRef.set(studentVO);
        StudentService.updateRegistrationNode (studentVO.schoolId, studentVO, serviceObject);
        console.log("Added Record .."+ studentVO);
        messageTO.messageInfo = Messages.STUDENT_ADDED;
        studentComponentInterface.successMessageCallBack(messageTO);
      }
    });

  }




  updateStudentProfile(schoolId: string, studentVO: StudentVO, studentComponentInterface: StudentComponentInterface) {

    var serviceObject = this;
    var firebaseObject = this.angularFireDatabase;
    var messageTO = new MessageTO();
    messageTO.serviceClassName = "StudentService";
    messageTO.serviceMethodName = "updateStudentProfile()";
    console.log("updateStudentProfile xxx " + schoolId + " " + studentVO.id);


    var studentProfilePath = PathUtil.getStudentProfilePathNode(schoolId);
    console.log("updateStudentProfile studentProfilePath ==> "+ studentProfilePath);
    var ref = this.angularFireDatabase.object(NodeConstants.SCHOOLS).$ref.child(studentProfilePath).orderByChild(NodeConstants.UNIQUE_ID).equalTo(studentVO.uniqueId).once("value", function (snapshot) {
      var exists = (snapshot.val() !== null);

      console.log("exists  ==> "+ exists);

      if (exists) {
        console.log("Record Exists, So validate if the id is matching otherwise don't update the record.")
        // if the  existing record id and your id from UI are equal, then only update the DB , else dont update because that's not your record.
        var dbRecord = snapshot.val();

        Object.keys(dbRecord).forEach(function (key) {

          let schoolVOFromDB = dbRecord[key];

          console.log("schoolVOFromDB.id == studentVO.id " + schoolVOFromDB.id + " " +studentVO.id );

          if (schoolVOFromDB.id == studentVO.id) {
            var dbRef = firebaseObject.object(PathUtil.getStudentProfilePath(studentVO.schoolId, studentVO.id)).$ref;
            dbRef.set(studentVO);
            StudentService.updateRegistrationNode (schoolId, studentVO, serviceObject);
            messageTO.messageInfo = Messages.STUDENT_UPDATED;

            studentComponentInterface.successMessageCallBack(messageTO);

          }else{
            messageTO.messageInfo = Messages.STUDENT_EXISTS;
            studentComponentInterface.errorMessageCallBack(messageTO);
          }

        });

      } else {
        console.log("You are trying to update the student with a student name which is not there in DB. ");
        console.log("schoolVOFromDB.id == studentVO.id " + studentVO.id + " " +studentVO.id );

        var dbRef = firebaseObject.object(PathUtil.getStudentProfilePath(studentVO.schoolId, studentVO.id)).$ref;
        dbRef.set(studentVO);
        StudentService.updateRegistrationNode (schoolId, studentVO, serviceObject);
        messageTO.messageInfo = Messages.STUDENT_UPDATED;
       studentComponentInterface.successMessageCallBack(messageTO);
      }
    });

  }



  public static updateRegistrationNode (schoolId: string, studentVO: StudentVO, studentService: StudentService){

    var firebaseObject = studentService.angularFireDatabase;

    Object.keys(studentVO.mobileNumbers).forEach(index=> {

      var fieldNameValue = studentVO.mobileNumbers[index];
      Object.keys(fieldNameValue).forEach(fieldName=> {

        var phoneNumber = fieldNameValue[fieldName];
        console.log('Mobile #s : '+phoneNumber);

        if (phoneNumber != "" ) {

          var registeredUser = new RegisteredUser();
          registeredUser.active = "true";
          registeredUser.phoneNumber = phoneNumber;
          registeredUser.userType = "parent";

          console.log('Create Registration Node : '+PathUtil.getRegisteredUsersPath(phoneNumber));
          var dbRef = firebaseObject.object(PathUtil.getRegisteredUsersPath(phoneNumber)).$ref;
          dbRef.set(registeredUser);


          var registeredStudent = new RegisteredStudent();
          registeredStudent.schoolId = schoolId;
          registeredStudent.firstName = studentVO.firstName;
          registeredStudent.middleName = studentVO.middleName;
          registeredStudent.lastName = studentVO.lastName;
          registeredStudent.studentId = studentVO.id;
          registeredStudent.classId = studentVO.classId;
          registeredStudent.className = studentVO.classId;//TODO need to change it to class name.

          registeredStudent.profilePic = "TBD";//TODO Implementation pending
          registeredStudent.schoolActive = "true";


          StudentService.addStudentInRegistration(schoolId,phoneNumber,registeredStudent,firebaseObject);

        }else{

          console.log(' Registration Node Not Created : '+ phoneNumber);
        }

      });

    });

  }


  public static addStudentInRegistration(schoolId:string, phoneNumber: string, registeredStudent: RegisteredStudent, angularFireDatabase: AngularFireDatabase){
    var schoolProfileVO=  new SchoolProfileVO();
    var schoolObject = StudentService.getSchoolProfile(schoolId, angularFireDatabase);
    schoolObject.subscribe(snapshot => {
      schoolProfileVO = snapshot;

      registeredStudent.schoolName = schoolProfileVO.schoolName;
      registeredStudent.schoolDisplayShortName = schoolProfileVO.schoolDisplayName;

      console.log('Create Student Node : '+PathUtil.getRegisteredUsersPath(phoneNumber)+"students/"+schoolId+"/"+registeredStudent.studentId);

      var dbRef = angularFireDatabase.object(PathUtil.getRegisteredUsersPath(phoneNumber)+"students/"+schoolId+"/"+registeredStudent.studentId).$ref;
      dbRef.set(registeredStudent);


    });
  }


  public static getSchoolProfile(schoolId: string, angularFireDatabase: AngularFireDatabase): FirebaseObjectObservable<any> {
    var schoolProfile = angularFireDatabase.object("/schools/schoolProfile/" + schoolId);
    return schoolProfile;
  }

  deleteStudentProfile(schoolid: string, studentId: string) {
    this.angularFireDatabase.object(PathUtil.getStudentProfilePath(schoolid,studentId)).$ref.remove();
  }


}
