/**
 * Created by ravisha on 7/3/17.
 */
import {Injectable} from "@angular/core";
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database-deprecated';

import {CommonConverter} from "./CommonConverter";
import {MasterSubjectTO} from "../../to/MasterSubjectTO";
import {MasterSubjectVO} from "../../vo/MasterSubjectVO";
import {MasterSubjectComponentInterface} from "../../component/mastersubject/MasterSubjectComponentInterface";
import {MasterSubjectConverter} from "../interfaces/MasterSubjectConverter";
import {MasterSubjectService} from "../../service/master-subject.service";

/**
 * Created by ravisha on 4/21/17.
 */

@Injectable()
export class MasterSubjectConverterImpl extends CommonConverter implements MasterSubjectConverter {
  masterSubjectVO: MasterSubjectVO;
  //schoolProfileTO:SchoolProfileTO;


  constructor(private masterSubjectService: MasterSubjectService) {
    super()
  }

  /**
   * Decide your unqiue key here.
   * @param masterSubjectTO
   * @returns {string}
   */
  getUniqueKey(masterSubjectTO: MasterSubjectTO):string {
    return masterSubjectTO.subjectName.toLowerCase();
  }

  /**
   * This method is a converter from TO to VO. Always ensure that unique key is assigned  properly.
   * @param masterSubjectTO
   * @returns {MasterSubjectVO}
   */
  getVOFromTO(masterSubjectTO: MasterSubjectTO): MasterSubjectVO {
    var masterSubjectVO = new MasterSubjectVO();

    masterSubjectVO.subjectId = masterSubjectTO.subjectName.toLowerCase();
    masterSubjectVO.subjectName = masterSubjectTO.subjectName;
    masterSubjectVO.uniqueId = this.getUniqueKey(masterSubjectTO);

    console.log("MasterSubjectTO ===>"+ masterSubjectVO.toString())

    return masterSubjectVO;
  }

  /**
   * Used for adding the school profile.
   * @param schoolId
   * @param masterSubjectTO
   * @param masterSubjectComponentInterface
   */
  addMasterSubject(schoolId: string, masterSubjectTO: MasterSubjectTO, masterSubjectComponentInterface: MasterSubjectComponentInterface) {
    try {

      this.masterSubjectService.addMasterSubject(schoolId, this.getVOFromTO(masterSubjectTO),masterSubjectComponentInterface);

    } catch (masterSubjectError) {
      throw masterSubjectError;
    }
  }


  getMasterSubject(schoolId: string, subjectId: string, masterSubjectComponentInterface: MasterSubjectComponentInterface) {

    var masterSubjectTO = new MasterSubjectTO();
    var object = this.masterSubjectService.getMasterSubject(schoolId, subjectId);

    object.subscribe(snapshot => {
      masterSubjectTO = snapshot;
      masterSubjectComponentInterface.displayMasterSubjectCallBack(masterSubjectTO);
    });
  }


  /**
   * Used for getting the list of all MasterSubjects.
   * @param masterSubjectComponentInterface
   */
  getAllMasterSubject(schoolId: string, masterSubjectComponentInterface: MasterSubjectComponentInterface) {

    var objData: FirebaseListObservable<MasterSubjectTO>;
    var object = this.masterSubjectService.getAllMasterSubject(schoolId);
    object.subscribe(snapshot => {
      objData = snapshot;
      masterSubjectComponentInterface.displayAllMasterSubjectCallBack(objData);

    });
  }


  /**
   * Used for updating the school profile.
   * @param schoolId
   * @param subjectId
   * @param masterSubjectTO
   * @param masterSubjectComponentInterface
   */
  updateMasterSubject(schoolId: string, subjectId: string, masterSubjectTO: MasterSubjectTO, masterSubjectComponentInterface: MasterSubjectComponentInterface) {

    console.log("updateMasterSubject masterSubjectTO " + masterSubjectTO);
    this.masterSubjectService.updateMasterSubject(schoolId, subjectId, this.getVOFromTO(masterSubjectTO), masterSubjectComponentInterface);

  }

  deleteMasterSubject(schoolid: string, subjectId: string, masterSubjectComponentInterface: MasterSubjectComponentInterface) {

    this.masterSubjectService.deleteMasterSubject(schoolid, subjectId, masterSubjectComponentInterface);

  }


}
