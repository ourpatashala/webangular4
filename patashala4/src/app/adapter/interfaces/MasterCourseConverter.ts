import {MasterCourseTO} from "../../to/MasterCourseTO";
import {MasterCourseComponent} from "../../component/master-course/master-course.component";
import {MasterCourseComponentInterface} from "../../component/master-course/MasterCourseComponentInterface";

/**
 * Created by ravisha on 7/3/17.
 */
export interface MasterCourseConverter {

  addMasterCourse(schoolId:string, masterCourseTO: MasterCourseTO, masterCourseComponentInterface: MasterCourseComponentInterface);

  getMasterCourse(schoolId: string, subjectId: string, masterCourseComponentInterface: MasterCourseComponentInterface);

  getMasterCourseSyllabus(schoolId: string, subjectId: string, masterCourseComponentInterface: MasterCourseComponentInterface);


  updateMasterCourse(schoolId: string, subjectId: string, masterCourseTO: MasterCourseTO, masterCourseComponentInterface: MasterCourseComponentInterface);

  deleteMasterCourse(schoolid: string, subjectId: string, masterCourseComponentInterface: MasterCourseComponentInterface);

  getAllMasterCourse(schoolId:string, masterCourseComponentInterface: MasterCourseComponentInterface);

}
