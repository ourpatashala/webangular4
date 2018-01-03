import {Injectable} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database-deprecated';
import {AngularFireAuth} from 'angularfire2/auth';

import {MasterCourseComponentInterface} from "../component/master-course/MasterCourseComponentInterface";
import {PathUtil} from "../util/PathUtil";
import {NodeConstants} from "../constants/NodeConstants";
import {MasterCourseVO} from "../vo/MasterCourseVO";
import {MessageTO} from "../to/MessageTO";
import {Messages} from "../constants/Messages";
import {ChapterVO} from "../vo/ChapterVO";

@Injectable()
export class MasterCourseService {

  constructor(private angularFireDatabase: AngularFireDatabase, private angularFireAuth: AngularFireAuth) {
  }

  /**
   * Method to add MasterSubject
   * @param schoolId
   * @param masterCourseVO
   * @param masterCourseComponentInterface
   */
  addMasterCourse(schoolId: string, masterCourseVO: MasterCourseVO, masterCourseComponentInterface: MasterCourseComponentInterface) {

    this.searchAndAddMasterCourse(schoolId, masterCourseVO, masterCourseComponentInterface);

  }


  /**
   * This method is called by addMasterSubject. It checks whether the object already exist, if yes then throw error.
   * @param schoolId
   * @param masterCourseVO
   * @param masterCourseComponentInterface
   */
  private searchAndAddMasterCourse(schoolId: string, masterCourseVO: MasterCourseVO,  masterCourseComponentInterface: MasterCourseComponentInterface) {

    var path = PathUtil.getMasterDataPath(schoolId);

    var messageTO = new MessageTO();
    messageTO.serviceClassName = "MasterCourseService";
    messageTO.serviceMethodName = "searchAndAddMasterCourse()";


    var firebaseObject = this.angularFireDatabase;

    var ref = this.angularFireDatabase.object("/").$ref.child(path + "/course/").orderByChild(NodeConstants.UNIQUE_ID).equalTo(masterCourseVO.uniqueId).once("value", function (snapshot) {
      var exists = (snapshot.val() !== null);
      if (exists) {
        console.log("Record already exists..");
        messageTO.messageInfo = Messages.MASTERSYLLABUS_EXISTS;

        masterCourseComponentInterface.errorMessageCallBack(messageTO);

      } else {
        console.log("Record not existed..");


        //masterCourseVO.uniqueId = masterCourseVO.subjectId;
        var dbRef = firebaseObject.object(path + "/course/").$ref.push(path + "/course/");
        masterCourseVO.courseId = dbRef.key
        dbRef.set(masterCourseVO);


        messageTO.messageInfo = Messages.MASTERSYLLABUS_ADDED;
        messageTO.objId = masterCourseVO.courseId;
        masterCourseComponentInterface.successMessageCallBack(messageTO);
      }
    });


  }

  /**
   * This method updates the node.
   * 1. Check if the node exists with id, if not throw error
   * 2. Check if there is node with same unique id, if yes then throw error.
   * @param schoolId
   * @param courseId
   * @param masterCourseVO
   * @param masterCourseComponentInterface
   */
  updateMasterCourse(schoolId: string, courseId: string, masterCourseVO: MasterCourseVO, masterCourseComponentInterface: MasterCourseComponentInterface) {


    var firebaseObject = this.angularFireDatabase;
    var messageTO = new MessageTO();
    messageTO.serviceClassName = "MasterCourseService";
    messageTO.serviceMethodName = "updateMasterCourse()";

    masterCourseVO.courseId = courseId;

    var path = PathUtil.getMasterDataPath(schoolId);

    var ref = this.angularFireDatabase.object("/").$ref.child(path+"course").orderByChild(NodeConstants.UNIQUE_ID).equalTo(masterCourseVO.uniqueId).once("value", function (snapshot) {
      var exists = (snapshot.val() !== null);

      console.log("exists  ==> " + exists);

      if (exists) {
        console.log("Record Exists, So validate if the id is matching otherwise don't update the record.")
        // if the  existing record id and your id from UI are equal, then only update the DB , else dont update because that's not your record.
        var dbRecord = snapshot.val();

        Object.keys(dbRecord).forEach(function (key) {

          let voFromDB = dbRecord[key];

          console.log("Compare ==>"+ voFromDB.courseId + " " +masterCourseVO.courseId)

          if (voFromDB.courseId == masterCourseVO.courseId) {
            var dbRef = firebaseObject.object(PathUtil.getMasterCoursePathNode(schoolId, masterCourseVO.courseId)).$ref;
            dbRef.set(masterCourseVO);



            messageTO.messageInfo = Messages.MASTERSYLLABUS_UPDATED;
            masterCourseComponentInterface.successMessageCallBack(messageTO);
          } else {
            messageTO.messageInfo = Messages.MASTERSYLLABUS_EXISTS;
            masterCourseComponentInterface.errorMessageCallBack(messageTO);
          }
        });
      } else {
        console.log("You are trying to update the subject with a subject name which is not there in DB. ");


        var dbRef = firebaseObject.object(PathUtil.getMasterCoursePathNode(schoolId, courseId)).$ref;
        masterCourseVO.courseId = courseId;
        dbRef.set(masterCourseVO);

        console.log("masterCourseVO ==>" + masterCourseVO.toString());



        messageTO.messageInfo = Messages.MASTERSYLLABUS_UPDATED;
        masterCourseComponentInterface.successMessageCallBack(messageTO);
      }
    });

  }

  /**
   * Get single node
   * @param schoolId
   * @param courseId
   * @returns {FirebaseObjectObservable<any>}
   */
  getMasterCourse(schoolId: string, courseId: string): FirebaseObjectObservable<any> {

    var path = PathUtil.getMasterCoursePathNode(schoolId, courseId);
    var object = this.angularFireDatabase.object(path);
    return object;
  }

  /**
   * Get single node
   * @param schoolId
   * @param courseId
   * @returns {FirebaseObjectObservable<any>}
   */
  getMasterCourseSyllabus(schoolId: string, courseId: string): FirebaseObjectObservable<any> {

    var path = PathUtil.getMasterCourseSyllabusPathNode(schoolId, courseId);
    console.log("getMasterCourseSyllabus path ==>"+ path);
    var object = this.angularFireDatabase.object(path);
    return object;
  }


  /**
   * Get complete list
   * @param schoolId
   * @returns {FirebaseListObservable<any[]>}
   */

  getAllMasterCourse(schoolId: string): FirebaseListObservable<any> {

    var path = PathUtil.getMasterCourseNode(schoolId);
    var object = this.angularFireDatabase.list(path);
    return object;
  }

  /**
   * Delete master subject  node
   * @param schoolId
   * @param subjectId
   * @param masterCourseComponentInterface
   */
  deleteMasterCourse(schoolId: string, courseId: string, masterCourseComponentInterface: MasterCourseComponentInterface) {

    var path = PathUtil.getMasterCoursePathNode(schoolId, courseId);

    this.angularFireDatabase.object(path).$ref.remove();

  }
}
