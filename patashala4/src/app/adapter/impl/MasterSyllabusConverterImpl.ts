/**
 * Created by ravisha on 7/3/17.
 */
import {Injectable} from "@angular/core";
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database-deprecated';

import {CommonConverter} from "./CommonConverter";
import {MasterSyllabusTO} from "../../to/MasterSyllabusTO";
import {MasterSyllabusVO} from "../../vo/MasterSyllabusVO";
import {MasterSyllabusComponentInterface} from "../../component/master-syllabus/MasterSyllabusComponentInterface";
import {MasterSyllabusConverter} from "../interfaces/MasterSyllabusConverter";
import {MasterSubjectService} from "../../service/master-subject.service";
import {ChapterVO} from "../../vo/ChapterVO";
import {MasterSyllabusService} from "../../service/master-syllabus.service";


/**
 * Created by ravisha on 4/21/17.
 */

@Injectable()
export class MasterSyllabusConverterImpl extends CommonConverter implements MasterSyllabusConverter {
  masterSyllabusVO: MasterSyllabusVO;



  constructor(private masterSyllabusService: MasterSyllabusService, private masterSubjectService: MasterSubjectService) {
    super()
  }

  /**
   * Decide your unqiue key here.
   * @param masterSyllabusTO
   * @returns {string}
   */
  getUniqueKey(masterSyllabusTO: MasterSyllabusTO):string {
    return masterSyllabusTO.syllabusName.toLowerCase();
  }

  /**
   * This method is a converter from TO to VO. Always ensure that unique key is assigned  properly.
   * @param masterSyllabusTO
   * @returns {MasterSyllabusVO}
   */
  getVOFromTO(masterSyllabusTO: MasterSyllabusTO): MasterSyllabusVO {
    var masterSyllabusVO = new MasterSyllabusVO();

    masterSyllabusVO.syllabusId = masterSyllabusTO.syllabusId;
    masterSyllabusVO.syllabusName = masterSyllabusTO.syllabusName;

    masterSyllabusVO.subjectId = masterSyllabusTO.subjectName.toLowerCase();
    masterSyllabusVO.subjectName = masterSyllabusTO.subjectName;
    masterSyllabusVO.uniqueId = this.getUniqueKey(masterSyllabusTO);

    console.log("MasterSyllabusTO ===>"+ masterSyllabusVO.toString())

    return masterSyllabusVO;
  }

  /**
   * Used for adding the school profile.
   * @param schoolId
   * @param masterSyllabusTO
   * @param masterSyllabusComponentInterface
   */
  addMasterSyllabus(schoolId: string, masterSyllabusTO: MasterSyllabusTO, chaptersList: ChapterVO[], masterSyllabusComponentInterface: MasterSyllabusComponentInterface) {
    try {

      this.masterSyllabusService.addMasterSyllabus(schoolId, this.getVOFromTO(masterSyllabusTO),chaptersList, masterSyllabusComponentInterface);

    } catch (masterSubjectError) {
      throw masterSubjectError;
    }
  }


  getMasterSyllabus(schoolId: string, subjectId: string, masterSyllabusComponentInterface: MasterSyllabusComponentInterface) {

    var masterSyllabusTO = new MasterSyllabusTO();
    var object = this.masterSyllabusService.getMasterSyllabus(schoolId, subjectId);

    object.subscribe(snapshot => {
      masterSyllabusTO = snapshot;
      masterSyllabusComponentInterface.displayMasterSyllabusCallBack(masterSyllabusTO);
    });
  }


  /**
   * Used for getting the list of all MasterSyllabus.
   * @param masterSyllabusComponentInterface
   */
  getAllMasterSyllabus(schoolId: string, masterSyllabusComponentInterface: MasterSyllabusComponentInterface) {
    console.log(" service log "+ schoolId);
    var objData: FirebaseListObservable<MasterSyllabusTO>;
    var object = this.masterSyllabusService.getAllMasterSyllabus(schoolId);
    object.subscribe(snapshot => {
      objData = snapshot;
      masterSyllabusComponentInterface.displayAllMasterSyllabusCallBack(objData);

    });
  }


  /**
   * Used for updating the school profile.
   * @param schoolId
   * @param subjectId
   * @param masterSyllabusTO
   * @param masterSyllabusComponentInterface
   */
  updateMasterSyllabus(schoolId: string, syllabusId: string, masterSyllabusTO: MasterSyllabusTO, chaptersList: ChapterVO[], masterSyllabusComponentInterface: MasterSyllabusComponentInterface) {

    console.log("updateMasterSubject masterSyllabusTO " + masterSyllabusTO);
    masterSyllabusTO.uniqueId = this.getUniqueKey(masterSyllabusTO)
    this.masterSyllabusService.updateMasterSyllabus(schoolId, syllabusId, this.getVOFromTO(masterSyllabusTO), chaptersList, masterSyllabusComponentInterface);

  }


  /**
   * Delete node
   * @param schoolid
   * @param syllabusId
   * @param masterSyllabusComponentInterface
   */
  deleteMasterSyllabus(schoolid: string, syllabusId: string, masterSyllabusComponentInterface: MasterSyllabusComponentInterface) {

    this.masterSyllabusService.deleteMasterSyllabus(schoolid, syllabusId, masterSyllabusComponentInterface);

  }


}
