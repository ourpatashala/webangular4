import {Injectable} from "@angular/core";
import {StudentVO} from "../../vo/StudentVO";
import {StudentTO} from "../../to/StudentTO";
/**
 * Created by ravisha on 4/21/17.
 */


export interface StudentConverter {
  addStudentProfile(schoolId : string,studentTO: StudentTO);
}
