import {SyllabusIdNameTO} from "./SyllabusIdNameTO"

/**
 * Created by preneeth on 12/6/17.
 */

export class MasterCourseTO{

  courseId : string;
  courseName: string;
  uniqueId:string;
  syllabusList : SyllabusIdNameTO []

  public toString():string {
    return this.courseId + " " +  this.courseName + " " + this.uniqueId;
  }
}


