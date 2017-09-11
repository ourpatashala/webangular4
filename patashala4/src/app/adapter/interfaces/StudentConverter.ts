import {Injectable} from "@angular/core";
import {StudentVO} from "../../vo/StudentVO";
import {StudentTO} from "../../to/StudentTO";
import {StudentComponentInterface} from "../../component/student/StudentComponentInterface";
/**
 * Created by ravisha on 4/21/17.
 */


export interface StudentConverter {

  addStudentProfile(schoolId : string,studentTO: StudentTO, studentComponentInterface: StudentComponentInterface);

  getStudent(schoolId:string, studentId:string,  studentComponentInterface:StudentComponentInterface);

  updateStudent(schoolId : string,studentTO: StudentTO, studentComponentInterface: StudentComponentInterface);


}
