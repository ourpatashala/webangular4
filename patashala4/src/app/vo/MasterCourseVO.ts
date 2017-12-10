import {SyllabusIdNameVO} from "./SyllabusIdNameVO"

/**
 * Created by preneeth on 12/6/17.
 */

export class MasterCourseVO{

  courseId : string;
  courseName: string;
  uniqueId:string;
  syllabusList : SyllabusIdNameVO []

  public toString():string {
    return this.courseId + " " +  this.courseName + " " + this.uniqueId;
  }
}


