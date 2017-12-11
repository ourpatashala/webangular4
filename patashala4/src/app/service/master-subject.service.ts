import {Injectable} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';

import {MasterSubjectComponentInterface} from "../component/mastersubject/MasterSubjectComponentInterface";
import {PathUtil} from "../util/PathUtil";
import {NodeConstants} from "../constants/NodeConstants";
import {MasterSubjectVO} from "../vo/MasterSubjectVO";
import {MessageTO} from "../to/MessageTO";
import {Messages} from "../constants/Messages";


@Injectable()
export class MasterSubjectService {

  constructor(private angularFireDatabase: AngularFireDatabase, private angularFireAuth: AngularFireAuth) {
  }

  /**
   * Method to add MasterSubject
   * @param schoolId
   * @param masterSubjectVO
   * @param masterSubjectComponentInterface
   */
  addMasterSubject(schoolId: string, masterSubjectVO: MasterSubjectVO, masterSubjectComponentInterface: MasterSubjectComponentInterface) {

    this.searchAndAddMasterSubject(schoolId, masterSubjectVO,masterSubjectComponentInterface);

  }


  /**
   * This method is called by addMasterSubject. It checks whether the object already exist, if yes then throw error.
   * @param schoolId
   * @param masterSubjectVO
   * @param masterSubjectComponentInterface
   */
  private searchAndAddMasterSubject(schoolId: string, masterSubjectVO: MasterSubjectVO, masterSubjectComponentInterface: MasterSubjectComponentInterface) {

    var path = PathUtil.getMasterDataPath(schoolId);

    var messageTO = new MessageTO();
    messageTO.serviceClassName = "MasterSubjectService";
    messageTO.serviceMethodName = "searchAndAddMasterSubject()";



    var firebaseObject = this.angularFireDatabase;

    var ref = this.angularFireDatabase.object("/").$ref.child(path+"/subjects/").orderByChild(NodeConstants.UNIQUE_ID).equalTo(masterSubjectVO.uniqueId).once("value", function (snapshot) {
      var exists = (snapshot.val() !== null);
      if (exists) {
        console.log("Record already exists..");
        messageTO.messageInfo = Messages.MASTERSUBJECT_EXISTS;

        masterSubjectComponentInterface.errorMessageCallBack(messageTO);

      } else {
        console.log("Record not existed..");

        masterSubjectVO.subjectId = masterSubjectVO.subjectName.toLowerCase();
        //masterSubjectVO.uniqueId = masterSubjectVO.subjectId;
        var dbRef = firebaseObject.object(path+"/subjects/"+masterSubjectVO.subjectId).$ref.set(masterSubjectVO);

        messageTO.messageInfo = Messages.MASTERSUBJECT_ADDED;
        messageTO.objId = masterSubjectVO.subjectId;
        masterSubjectComponentInterface.successMessageCallBack(messageTO);
      }
    });


  }

  /**
   * This method updates the node.
   * 1. Check if the node exists with id, if not throw error
   * 2. Check if there is node with same unique id, if yes then throw error.
   * @param schoolId
   * @param subjectId
   * @param masterSubjectVO
   * @param masterSubjectComponentInterface
   */
  updateMasterSubject(schoolId: string, subjectId: string, masterSubjectVO: MasterSubjectVO, masterSubjectComponentInterface: MasterSubjectComponentInterface) {


    var firebaseObject = this.angularFireDatabase;
    var messageTO = new MessageTO();
    messageTO.serviceClassName = "MasterSubjectService";
    messageTO.serviceMethodName = "updateMasterSubject()";
    masterSubjectVO.subjectId = subjectId;


    var path = PathUtil.getMasterDataPath(schoolId);
    console.log("updateMasterSubject path  ==> "+ path);
    var ref = this.angularFireDatabase.object("/").$ref.child(path+"/subjects").orderByChild(NodeConstants.UNIQUE_ID).equalTo(masterSubjectVO.uniqueId).once("value", function (snapshot) {
      var exists = (snapshot.val() !== null);

      console.log("exists  ==> "+ exists);

      if (exists) {
        console.log("Record Exists, So validate if the id is matching otherwise don't update the record.")
        // if the  existing record id and your id from UI are equal, then only update the DB , else dont update because that's not your record.
        var dbRecord = snapshot.val();

        Object.keys(dbRecord).forEach(function (key) {

          let voFromDB = dbRecord[key];

          if (voFromDB.subjectId == masterSubjectVO.subjectId) {
            var dbRef = firebaseObject.object(PathUtil.getMasterSubjectPath(schoolId, masterSubjectVO.subjectId)).$ref;
            dbRef.set(masterSubjectVO);
            messageTO.messageInfo = Messages.MASTERSUBJECT_UPDATED;
            masterSubjectComponentInterface.successMessageCallBack(messageTO);
          }else{
            messageTO.messageInfo = Messages.MASTERSUBJECT_EXISTS;
            masterSubjectComponentInterface.errorMessageCallBack(messageTO);
          }
        });
      } else {
        console.log("You are trying to update the subject with a subject name which is not there in DB. ");


        var dbRef = firebaseObject.object(PathUtil.getMasterSubjectPath(schoolId, subjectId)).$ref;
        masterSubjectVO.subjectId = subjectId;
        dbRef.set(masterSubjectVO);

        messageTO.messageInfo = Messages.MASTERSUBJECT_UPDATED;
        masterSubjectComponentInterface.successMessageCallBack(messageTO);
      }
    });

  }

  /**
   * Get single node
   * @param schoolId
   * @param subjectId
   * @returns {FirebaseObjectObservable<any>}
   */
  getMasterSubject(schoolId: string, subjectId: string): FirebaseObjectObservable<any> {

    var path = PathUtil.getMasterSubjectPathNode(schoolId, subjectId);
    var object = this.angularFireDatabase.object(path);
    return object;
  }

  /**
   * Get coplete list
   * @param schoolId
   * @returns {FirebaseListObservable<any[]>}
   */

  getAllMasterSubject(schoolId: string): FirebaseListObservable<any> {

    var path = PathUtil.getMasterSubjectNode(schoolId);
    var object = this.angularFireDatabase.list(path);
    return object;
  }

  /**
   * Delete master subject  node
   * @param schoolId
   * @param subjectId
   * @param masterSubjectComponentInterface
   */
  deleteMasterSubject(schoolId: string, subjectId: string, masterSubjectComponentInterface: MasterSubjectComponentInterface) {

    var path = PathUtil.getMasterSubjectPathNode(schoolId, subjectId);

    this.angularFireDatabase.object(path).$ref.remove();

  }

}
