/**
 * Created by ravisha on 7/3/17.
 */
import {Injectable} from "@angular/core";
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database-deprecated';

import {CommonConverter} from "./CommonConverter";
import {MasterCourseTO} from "../../to/MasterCourseTO";
import {MasterCourseVO} from "../../vo/MasterCourseVO";
import {MasterCourseComponentInterface} from "../../component/master-course/MasterCourseComponentInterface";
import {MasterCourseConverter} from "../interfaces/MasterCourseConverter";
import {MasterSubjectService} from "../../service/master-subject.service";
import {ChapterVO} from "../../vo/ChapterVO";
import {MasterCourseService} from "../../service/master-course.service";


/**
 * Created by ravisha on 4/21/17.
 */

@Injectable()
export class MasterCourseConverterImpl extends CommonConverter implements MasterCourseConverter {
  masterCourseVO: MasterCourseVO;



  constructor(private masterCourseService: MasterCourseService, private masterSubjectService: MasterSubjectService) {
    super()
  }

  /**
   * Decide your unqiue key here.
   * @param masterCourseTO
   * @returns {string}
   */
  getUniqueKey(masterCourseTO: MasterCourseTO):string {
    return masterCourseTO.courseName.toLowerCase();
  }

  /**
   * This method is a converter from TO to VO. Always ensure that unique key is assigned  properly.
   * @param masterCourseTO
   * @returns {MasterCourseVO}
   */
  getVOFromTO(masterCourseTO: MasterCourseTO): MasterCourseVO {
    var masterCourseVO = new MasterCourseVO();

    masterCourseVO.courseId = masterCourseTO.courseId;
    masterCourseVO.courseName = masterCourseTO.courseName;
    masterCourseVO.syllabusList = masterCourseTO.syllabusList

    masterCourseVO.uniqueId = this.getUniqueKey(masterCourseTO);

    console.log("MasterCourseTO ===>"+ masterCourseVO.toString())

    return masterCourseVO;
  }

  /**
   * Used for adding the school profile.
   * @param schoolId
   * @param masterCourseTO
   * @param masterCourseComponentInterface
   */
  addMasterCourse(schoolId: string, masterCourseTO: MasterCourseTO, masterCourseComponentInterface: MasterCourseComponentInterface) {
    try {

      this.masterCourseService.addMasterCourse(schoolId, this.getVOFromTO(masterCourseTO), masterCourseComponentInterface);

    } catch (masterSubjectError) {
      throw masterSubjectError;
    }
  }


  getMasterCourse(schoolId: string, courseId: string, masterCourseComponentInterface: MasterCourseComponentInterface) {

    var masterCourseTO = new MasterCourseTO();
    var object = this.masterCourseService.getMasterCourse(schoolId, courseId);

    object.subscribe(snapshot => {
      masterCourseTO = snapshot;

      masterCourseComponentInterface.displayMasterCourseCallBack(masterCourseTO);
    });
  }


  /**
   * Used for getting the list of all MasterCourse.
   * @param masterCourseComponentInterface
   */
  getAllMasterCourse(schoolId: string, masterCourseComponentInterface: MasterCourseComponentInterface) {

    var objData: FirebaseListObservable<MasterCourseTO>;
    var object = this.masterCourseService.getAllMasterCourse(schoolId);
    object.subscribe(snapshot => {
      objData = snapshot;
      masterCourseComponentInterface.displayAllMasterCourseCallBack(objData);

    });
  }


  /**
   * Used for updating the school profile.
   * @param schoolId
   * @param subjectId
   * @param masterCourseTO
   * @param masterCourseComponentInterface
   */
  updateMasterCourse(schoolId: string, courseId: string, masterCourseTO: MasterCourseTO, masterCourseComponentInterface: MasterCourseComponentInterface) {

    console.log("updateMasterSubject masterCourseTO " + masterCourseTO);
    masterCourseTO.uniqueId = this.getUniqueKey(masterCourseTO)
    this.masterCourseService.updateMasterCourse(schoolId, courseId, this.getVOFromTO(masterCourseTO), masterCourseComponentInterface);

  }


  /**
   * Delete node
   * @param schoolid
   * @param courseId
   * @param masterCourseComponentInterface
   */
  deleteMasterCourse(schoolid: string, courseId: string, masterCourseComponentInterface: MasterCourseComponentInterface) {

    this.masterCourseService.deleteMasterCourse(schoolid, courseId, masterCourseComponentInterface);

  }


}
