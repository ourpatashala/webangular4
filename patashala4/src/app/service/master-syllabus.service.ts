import {Injectable} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database-deprecated';
import {AngularFireAuth} from 'angularfire2/auth';

import {MasterSyllabusComponentInterface} from "../component/master-syllabus/MasterSyllabusComponentInterface";
import {PathUtil} from "../util/PathUtil";
import {NodeConstants} from "../constants/NodeConstants";
import {MasterSyllabusVO} from "../vo/MasterSyllabusVO";
import {MessageTO} from "../to/MessageTO";
import {Messages} from "../constants/Messages";
import {ChapterVO} from "../vo/ChapterVO";

@Injectable()
export class MasterSyllabusService {

  constructor(private angularFireDatabase: AngularFireDatabase, private angularFireAuth: AngularFireAuth) {
  }

  /**
   * Method to add MasterSubject
   * @param schoolId
   * @param masterSyllabusVO
   * @param masterSyllabusComponentInterface
   */
  addMasterSyllabus(schoolId: string, masterSyllabusVO: MasterSyllabusVO, chaptersList: ChapterVO[], masterSyllabusComponentInterface: MasterSyllabusComponentInterface) {

    this.searchAndAddMasterSyllabus(schoolId, masterSyllabusVO, chaptersList, masterSyllabusComponentInterface);

  }


  /**
   * This method is called by addMasterSubject. It checks whether the object already exist, if yes then throw error.
   * @param schoolId
   * @param masterSyllabusVO
   * @param masterSyllabusComponentInterface
   */
  private searchAndAddMasterSyllabus(schoolId: string, masterSyllabusVO: MasterSyllabusVO, chaptersList: ChapterVO[], masterSyllabusComponentInterface: MasterSyllabusComponentInterface) {

    var path = PathUtil.getMasterDataPath(schoolId);

    var messageTO = new MessageTO();
    messageTO.serviceClassName = "MasterSyllabusService";
    messageTO.serviceMethodName = "searchAndAddMasterSyllabus()";


    var firebaseObject = this.angularFireDatabase;

    var ref = this.angularFireDatabase.object("/").$ref.child(path + "/syllabus/").orderByChild(NodeConstants.UNIQUE_ID).equalTo(masterSyllabusVO.uniqueId).once("value", function (snapshot) {
      var exists = (snapshot.val() !== null);
      if (exists) {
        console.log("Record already exists..");
        messageTO.messageInfo = Messages.MASTERSYLLABUS_EXISTS;

        masterSyllabusComponentInterface.errorMessageCallBack(messageTO);

      } else {
        console.log("Record not existed..");



        var dbRef = firebaseObject.object(path + "/syllabus/").$ref.push(path + "/syllabus/");
        masterSyllabusVO.syllabusId = dbRef.key
        dbRef.set(masterSyllabusVO);

        firebaseObject.object(path + "/syllabus/" + masterSyllabusVO.syllabusId + "/chapterInfo/").$ref.remove();

        path = path + "/syllabus/" + masterSyllabusVO.syllabusId + "/chapterInfo/";
        for (var iIndex = 0; iIndex < chaptersList.length; iIndex++) {

          var dbRefObj = firebaseObject.object(path).$ref.push(path);
          chaptersList[iIndex].chapterId = dbRefObj.key;
          dbRefObj.set(chaptersList[iIndex]);
        }

        messageTO.messageInfo = Messages.MASTERSYLLABUS_ADDED;
        messageTO.objId = masterSyllabusVO.syllabusId;
        masterSyllabusComponentInterface.successMessageCallBack(messageTO);
      }
    });


  }

  /**
   * This method updates the node.
   * 1. Check if the node exists with id, if not throw error
   * 2. Check if there is node with same unique id, if yes then throw error.
   * @param schoolId
   * @param syllabusId
   * @param masterSyllabusVO
   * @param masterSyllabusComponentInterface
   */
  updateMasterSyllabus(schoolId: string, syllabusId: string, masterSyllabusVO: MasterSyllabusVO, chaptersList: ChapterVO[], masterSyllabusComponentInterface: MasterSyllabusComponentInterface) {


    var firebaseObject = this.angularFireDatabase;
    var messageTO = new MessageTO();
    messageTO.serviceClassName = "MasterSyllabusService";
    messageTO.serviceMethodName = "updateMasterSyllabus()";
    masterSyllabusVO.syllabusId = syllabusId;

    var path = PathUtil.getMasterDataPath(schoolId);

    var ref = this.angularFireDatabase.object("/").$ref.child(path+"syllabus").orderByChild(NodeConstants.UNIQUE_ID).equalTo(masterSyllabusVO.uniqueId).once("value", function (snapshot) {
      var exists = (snapshot.val() !== null);

      console.log("exists  ==> " + exists);

      if (exists) {
        console.log("Record Exists, So validate if the id is matching otherwise don't update the record.")
        // if the  existing record id and your id from UI are equal, then only update the DB , else dont update because that's not your record.
        var dbRecord = snapshot.val();

        Object.keys(dbRecord).forEach(function (key) {

          let voFromDB = dbRecord[key];

          if (voFromDB.syllabusId == masterSyllabusVO.syllabusId) {
            var dbRef = firebaseObject.object(PathUtil.getMasterSyllabusPathNode(schoolId, masterSyllabusVO.syllabusId)).$ref;
            dbRef.set(masterSyllabusVO);

            firebaseObject.object(path + "/syllabus/" + masterSyllabusVO.syllabusId + "/chapterInfo/").$ref.remove();

            path = path + "/syllabus/" + masterSyllabusVO.syllabusId + "/chapterInfo/";
            for (var iIndex = 0; iIndex < chaptersList.length; iIndex++) {

              var dbRefObj = firebaseObject.object(path).$ref.push(path);
              chaptersList[iIndex].chapterId = dbRefObj.key;
              dbRefObj.set(chaptersList[iIndex]);
            }

            messageTO.messageInfo = Messages.MASTERSYLLABUS_UPDATED;
            masterSyllabusComponentInterface.successMessageCallBack(messageTO);
          } else {
            messageTO.messageInfo = Messages.MASTERSYLLABUS_EXISTS;
            masterSyllabusComponentInterface.errorMessageCallBack(messageTO);
          }
        });
      } else {
        console.log("You are trying to update the syallbus with a syallbus name which is not there in DB. ");


        var dbRef = firebaseObject.object(PathUtil.getMasterSyllabusPathNode(schoolId, syllabusId)).$ref;
        masterSyllabusVO.syllabusId = syllabusId;
        dbRef.set(masterSyllabusVO);

        console.log("masterSyllabusVO ==>" + masterSyllabusVO.toString());

        firebaseObject.object(path + "/syllabus/" + masterSyllabusVO.syllabusId + "/chapterInfo/").$ref.remove();

        path = path + "/syllabus/" + masterSyllabusVO.syllabusId + "/chapterInfo/";
        for (var iIndex = 0; iIndex < chaptersList.length; iIndex++) {

          var dbRefObj = firebaseObject.object(path).$ref.push(path);
          chaptersList[iIndex].chapterId = dbRefObj.key;
          dbRefObj.set(chaptersList[iIndex]);
        }

        messageTO.messageInfo = Messages.MASTERSYLLABUS_UPDATED;
        masterSyllabusComponentInterface.successMessageCallBack(messageTO);
      }
    });

  }

  /**
   * Get single node
   * @param schoolId
   * @param syllabusId
   * @returns {FirebaseObjectObservable<any>}
   */
  getMasterSyllabus(schoolId: string, syllabusId: string): FirebaseObjectObservable<any> {

    var path = PathUtil.getMasterSyllabusPathNode(schoolId, syllabusId);
    console.log("getMasterSyllabus path ==>"+ path);

    var object = this.angularFireDatabase.object(path);
    return object;
  }

  /**
   * Get complete list
   * @param schoolId
   * @returns {FirebaseListObservable<any[]>}
   */

  getAllMasterSyllabus(schoolId: string): FirebaseListObservable<any> {

    var path = PathUtil.getMasterSyllabusNode(schoolId);
    var object = this.angularFireDatabase.list(path);
    return object;
  }

  /**
   *
   * @param schoolId
   * @returns {FirebaseListObservable<any[]>}
   */
  getChapters(schoolId: string, syllabusId: string): FirebaseListObservable<any> {

    var path = PathUtil.getMasterSyllabusChaptersPath(schoolId,syllabusId);
    var object = this.angularFireDatabase.list(path);
    return object;
  }

  /**
   * Delete master syllabus  node
   * @param schoolId
   * @param syllabusId
   * @param masterSyllabusComponentInterface
   */
  deleteMasterSyllabus(schoolId: string, syllabusId: string, masterSyllabusComponentInterface: MasterSyllabusComponentInterface) {

    var path = PathUtil.getMasterSyllabusPathNode(schoolId, syllabusId);

    this.angularFireDatabase.object(path).$ref.remove();

  }

}
