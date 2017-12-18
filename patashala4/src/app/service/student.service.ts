import {Injectable} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database-deprecated';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs/Observable';
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
import {FirebaseObjectObservable} from "angularfire2/database-deprecated/firebase_object_observable";
import {ConfigItemsVO} from "../vo/ConfigItemsVO";

@Injectable()
export class StudentService {

  firebaseApp: any;
  firebaseObject: any;
  count: number;
  //angularFireDatabase: AngularFireDatabase;
  //angularFireAuth:AngularFireAuth;

  constructor(private angularFireDatabase: AngularFireDatabase, private angularFireAuth: AngularFireAuth) {
    //this.angularFireDatabase = angularFireDatabase;
    this.angularFireAuth = angularFireAuth;
    this.count = 0;

  }

  addStudentProfile(schoolId: string, studentVO: StudentVO, studentComponentInterface: StudentComponentInterface) {

    studentVO.schoolId = schoolId;
    this.searchAndAddStudent(studentVO, studentComponentInterface);

  }

  getAllStudents(schoolId: string): FirebaseListObservable<any> {
    var studentProfilePath = PathUtil.getStudentPath(schoolId);
    var allstudentProfiles = this.angularFireDatabase.list(studentProfilePath);
    return allstudentProfiles;
  }

  getStudentProfileRange(schoolId: string, start: string, end: string) {
    var schoolProfilePath = PathUtil.getStudentPath(schoolId);

    var ref = this.angularFireDatabase.list(NodeConstants.SCHOOLS + schoolProfilePath).$ref.orderByChild("firstName").limitToLast(2).startAt(0).once("value", function (snapshot) {
      var dbRecord = snapshot.val();
      Object.keys(dbRecord).forEach(function (key) {
        let schoolVOFromDB = dbRecord[key];
        console.log(schoolVOFromDB.firstName);

      });

    });

  }


  getConfig(schoolId: string): FirebaseObjectObservable<any>{

    var path = PathUtil.getConfigPath(schoolId);

    console.log("getConfig path "+ path);

    return this.angularFireDatabase.object(path);


  }

  getAllClassProfiles(schoolId: string, academyYear: string): FirebaseListObservable<any> {

      var allClassProfiles = this.angularFireDatabase.list("/schools/" + schoolId + "/"+ academyYear +"/classProfile/");
      return allClassProfiles;

  }


  getStudentProfile(schoolId: string, studentId: string): FirebaseObjectObservable<any> {

    var studentProfilePath = PathUtil.getStudentProfilePath(schoolId, studentId);

    var studentInfo = this.angularFireDatabase.object(studentProfilePath);
    return studentInfo;
  }


  updateProfilePicURLInRegNodes(schoolId: string, studentId: string, profilePicURL: string): void {

    var studentInfo = this.angularFireDatabase.object(PathUtil.getStudentProfilePath(schoolId, studentId));

    console.log("Called updateProfilePicURLInRegNodes 1 ==profilePicURL==" + profilePicURL);

    var studentVO = new StudentVO();

    studentInfo.subscribe(snapshot => {
      studentVO = snapshot;

      Object.keys(studentVO.mobileNumbers).forEach(index => {

        var fieldNameValue = studentVO.mobileNumbers[index];
        Object.keys(fieldNameValue).forEach(fieldName => {

          var phoneNumber = fieldNameValue[fieldName];
          console.log('Mobile #s : ' + phoneNumber);

          console.log("Called updateProfilePicURLInRegNodes 2 ====");

          if (phoneNumber != "") {

            console.log("Called updateProfilePicURLInRegNodes 3 ====");
            //schools/registeredUsers/7702855641/students/-L-MUNeW9wfZTEutssRP/-L-MUxfp6sK2lYQWI9J6/profilePic
            var dbRef = this.angularFireDatabase.object("/schools/registeredUsers/" + phoneNumber + "/students/" + schoolId + "/" + studentId + "/profilePic/").$ref;
            dbRef.set(profilePicURL);


          }

        });

      });

    });

  }


  removeStudentsFromRegNode(schoolId: string, studentId: string): void {

    var studentInfo = this.angularFireDatabase.object("/").$ref.child(PathUtil.getStudentProfilePath(schoolId, studentId));

    var studentVO = new StudentVO();

    var db = this.angularFireDatabase;

    studentInfo.once('value', function (snapshot) {

      studentVO = snapshot.val();

      var mobileNumbers = studentVO.mobileNumbers;
      var count = mobileNumbers.length


      Object.keys(mobileNumbers).forEach(index => {

        var fieldNameValue = studentVO.mobileNumbers[index];
        Object.keys(fieldNameValue).forEach(fieldName => {

          var phoneNumber = fieldNameValue[fieldName];
          console.log('Mobile #s : ' + phoneNumber);

          console.log("Called removeStudentsFromRegNode 2 ====");

          if (phoneNumber != "") {

            console.log("Called removeStudentsFromRegNode 3 ====");
            //schools/registeredUsers/7702855641/students/-L-MUNeW9wfZTEutssRP/-L-MUxfp6sK2lYQWI9J6/profilePic
            var dbRef = db.object("/schools/registeredUsers/" + phoneNumber + "/students/" + schoolId + "/" + studentId ).$ref;
            dbRef.remove();
            console.log("Removed "+ studentId +" from "+ phoneNumber);


          }

          count = count - 1;
          console.log("Count = " + count);
          if (count == 0){
            console.log("========Now delete ============");
            db.object(PathUtil.getStudentProfilePath(schoolId, studentId)).$ref.remove();
          }


        });

      });



    });



  }


  searchAndAddStudent(studentVO: StudentVO, studentComponentInterface: StudentComponentInterface) {

    var serviceObject = this;
    var messageTO = new MessageTO();
    messageTO.serviceClassName = "StudentService";
    messageTO.serviceMethodName = "searchAndAddStudent()";


    var firebaseObject = this.angularFireDatabase;
    var studentProfilePath = PathUtil.getStudentPath(studentVO.schoolId);

    if (studentVO.schoolId == null || studentVO.schoolId == "") {
      messageTO.messageInfo = Messages.SCHOOL_ID_EMPTY
      studentComponentInterface.errorMessageCallBack(messageTO);
    }

    var studentService = this;

    console.log("updateStudentProfile studentProfilePath ==> " + studentProfilePath);
    var ref = this.angularFireDatabase.object(NodeConstants.SCHOOLS).$ref.child(studentProfilePath).orderByChild(NodeConstants.UNIQUE_ID).equalTo(studentVO.uniqueId).once("value", function (snapshot) {
      var exists = (snapshot.val() !== null);
      if (exists) {
        console.log("Record already exists..");

        messageTO.messageInfo = Messages.STUDENT_EXISTS;

        studentComponentInterface.errorMessageCallBack(messageTO);


      } else {
        console.log("Record not existed.." + studentProfilePath);
        var dbRef = firebaseObject.object(studentProfilePath).$ref.push(studentProfilePath);

        //var dbRef = firebaseObject.object(PathUtil.getSchoolProfilePath()).$ref.push(PathUtil.getSchoolProfilePath());
        studentVO.id = dbRef.key;

        console.log("Record not existed.." + studentVO);
        dbRef.set(studentVO);
        studentService.updateRegistrationNode(studentVO.schoolId, studentVO, serviceObject);
        console.log("Added Record .." + studentVO);
        messageTO.messageInfo = Messages.STUDENT_ADDED;
        messageTO.objId = studentVO.id;
        studentComponentInterface.successMessageCallBack(messageTO);
      }
    });

  }


  public updateStudentProfile(schoolId: string, studentVO: StudentVO, studentComponentInterface: StudentComponentInterface) {

    var serviceObject = this;
    var firebaseObject = this.angularFireDatabase;
    var messageTO = new MessageTO();
    messageTO.serviceClassName = "StudentService";
    messageTO.serviceMethodName = "updateStudentProfile()";
    console.log("updateStudentProfile xxx " + schoolId + " " + studentVO.id);
    console.log("updateStudentProfile DOB " + studentVO.dob);

    var serviceObject = this;

    var studentProfilePath = PathUtil.getStudentProfilePathNode(schoolId);
    console.log("updateStudentProfile studentProfilePath ==> " + studentProfilePath);
    var ref = this.angularFireDatabase.object(NodeConstants.SCHOOLS).$ref.child(studentProfilePath).orderByChild(NodeConstants.UNIQUE_ID).equalTo(studentVO.uniqueId).once("value", function (snapshot) {
      var exists = (snapshot.val() !== null);

      console.log("exists  ==> " + exists);

      if (exists) {
        console.log("Record Exists, So validate if the id is matching otherwise don't update the record.")
        // if the  existing record id and your id from UI are equal, then only update the DB , else dont update because that's not your record.
        var dbRecord = snapshot.val();

        Object.keys(dbRecord).forEach(function (key) {

          let schoolVOFromDB = dbRecord[key];

          console.log("schoolVOFromDB.id == studentVO.id " + schoolVOFromDB.id + " " + studentVO.id);

          if (schoolVOFromDB.id == studentVO.id) {
            var dbRef = firebaseObject.object(PathUtil.getStudentProfilePath(studentVO.schoolId, studentVO.id)).$ref;
            dbRef.set(studentVO);
            serviceObject.updateRegistrationNode(schoolId, studentVO, serviceObject);
            messageTO.messageInfo = Messages.STUDENT_UPDATED;

            studentComponentInterface.successMessageCallBack(messageTO);

          } else {
            messageTO.messageInfo = Messages.STUDENT_EXISTS;
            studentComponentInterface.errorMessageCallBack(messageTO);
          }

        });

      } else {
        console.log("You are trying to update the student with a student name which is not there in DB. ");
        console.log("schoolVOFromDB.id == studentVO.id " + studentVO.id + " " + studentVO.id);

        var dbRef = firebaseObject.object(PathUtil.getStudentProfilePath(studentVO.schoolId, studentVO.id)).$ref;
        dbRef.set(studentVO);
        serviceObject.updateRegistrationNode(schoolId, studentVO, serviceObject);
        messageTO.messageInfo = Messages.STUDENT_UPDATED;
        studentComponentInterface.successMessageCallBack(messageTO);
      }
    });

  }


  public updateRegistrationNode(schoolId: string, studentVO: StudentVO, studentService: StudentService) {

    var firebaseObject = this.angularFireDatabase;


    Object.keys(studentVO.mobileNumbers).forEach(index => {

      var fieldNameValue = studentVO.mobileNumbers[index];
      Object.keys(fieldNameValue).forEach(fieldName => {

        var phoneNumber = fieldNameValue[fieldName];
        console.log('Mobile #s : ' + phoneNumber);

        if (phoneNumber != "") {

          var registeredStudent = new RegisteredStudent();
          registeredStudent.schoolId = schoolId;
          registeredStudent.firstName = studentVO.firstName;
          registeredStudent.middleName = studentVO.middleName;
          registeredStudent.lastName = studentVO.lastName;
          registeredStudent.studentId = studentVO.id;
          registeredStudent.classId = studentVO.classId;
          registeredStudent.className = studentVO.className;//TODO need to change it to class name.

          registeredStudent.profilePic = studentVO.profilePhotoUrl;//TODO Implementation pending
          registeredStudent.schoolActive = "true";


          var users = firebaseObject.object("/").$ref.child(PathUtil.getRegisteredUsersNodePath());

          var angulardb = this.angularFireDatabase;

          users.once('value', function (snapshot) {

            console.log("Path ==> " + PathUtil.getRegisteredUsersNodePath());

            console.log(phoneNumber + " snapshot ==> " + snapshot.hasChild(phoneNumber))

            var registeredUser = new RegisteredUser();
            registeredUser.active = "true";
            registeredUser.phoneNumber = phoneNumber;
            registeredUser.userType = "parent";

            if (!snapshot.hasChild(phoneNumber)) {

              //Registration node does not exist, so create it

              console.log('Create Registration Node : ' + PathUtil.getRegisteredUsersPath(phoneNumber));
              var dbRef = firebaseObject.object(PathUtil.getRegisteredUsersPath(phoneNumber)).$ref;
              dbRef.set(registeredUser);
              StudentService.addStudentInRegistration(schoolId, phoneNumber, registeredStudent, firebaseObject);


            } else {


              console.log('Create Registration Node already exist, Just create Student : ' + PathUtil.getRegisteredUsersPath(phoneNumber));


              angulardb.database.ref(PathUtil.getRegisteredUsersPath(phoneNumber)).once('value').then(function (snapshot) {

                var regUser = new RegisteredUser();

                regUser = snapshot.val();
                console.log("Registration Object " + regUser);

                if (!regUser.userType.includes("parent", 0)) {
                  //This is done to append "parent" string to type if teacher or management already exist.
                  registeredUser.userType = "parent-" + regUser.userType;
                  console.log('Parent does not exist in Type : ' + regUser.userType);
                } else {

                  registeredUser.userType = regUser.userType
                  console.log('Parent exist in Type : ' + regUser.userType);
                }

                StudentService.addStudentInRegistration(schoolId, phoneNumber, registeredStudent, firebaseObject);
              })




            }
          });


        } else {

          console.log(' Registration Node Not Created : ' + phoneNumber);
        }

      });

    });

  }


  public static addStudentInRegistration(schoolId: string, phoneNumber: string, registeredStudent: RegisteredStudent, angularFireDatabase: AngularFireDatabase) {
    var schoolProfileVO = new SchoolProfileVO();
    var schoolObject = StudentService.getSchoolProfile(schoolId, angularFireDatabase);
    schoolObject.subscribe(snapshot => {
      schoolProfileVO = snapshot;

      registeredStudent.schoolName = schoolProfileVO.schoolName;
      registeredStudent.schoolDisplayShortName = schoolProfileVO.schoolDisplayName;

      console.log('Create Student Node : ' + PathUtil.getRegisteredUsersPath(phoneNumber) + "students/" + schoolId + "/" + registeredStudent.studentId);

      var dbRef = angularFireDatabase.object(PathUtil.getRegisteredUsersPath(phoneNumber) + "students/" + schoolId + "/" + registeredStudent.studentId).$ref;
      dbRef.set(registeredStudent);


    });
  }


  public static getSchoolProfile(schoolId: string, angularFireDatabase: AngularFireDatabase): FirebaseObjectObservable<any> {
    var schoolProfile = angularFireDatabase.object("/schools/schoolProfile/" + schoolId);
    return schoolProfile;
  }

  deleteStudentProfile(schoolid: string, studentId: string) {

    this.removeStudentsFromRegNode(schoolid,studentId);
    //The below method call is moved to above method removeStudentsFromRegNode
    //this.angularFireDatabase.object(PathUtil.getStudentProfilePath(schoolid, studentId)).$ref.remove();

  }


  getPhoto(schoolId: string, studentId: string, studentComponentInterface: StudentComponentInterface) {

    const storageRef = firebase.storage().ref();

    var photoPath = this.angularFireDatabase.object("/schools/" + schoolId + "/studentProfile/" + studentId);


    var studentVO = new StudentVO();
    photoPath.subscribe(snapshot => {
      studentVO = snapshot;
      //console.log("profilePhotoUrl from StudentOjbect:" + studentVO.profilePhotoUrl);

      storageRef.child(studentVO.profilePhotoUrl).getDownloadURL().then(function (url) {

        studentComponentInterface.displayPhotoCallBack(url);

      });


    });

  }


  getWithURLPhoto(schoolId: string, photoURL: string, studentComponentInterface: StudentComponentInterface) {

    const storageRef = firebase.storage().ref();


    //console.log("profilePhotoUrl from StudentOjbect:" + photoURL);

    storageRef.child(photoURL).getDownloadURL().then(function (url) {

      studentComponentInterface.displayPhotoWithURLCallBack(url);

    });

  }


}
