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

  deleteStudentProfile(schoolid: string, studentId:string);

  getStudentProfileRange(schoolid: string,start:string,end:string,studentComponentInterface: StudentComponentInterface);

  getAllStudents(schoolid: string,studentComponentInterface: StudentComponentInterface);

  getAllClassesProfile(schoolid: string,studentComponentInterface: StudentComponentInterface);

  getPhoto(schoolId: string, studentId: string, studentComponentInterface: StudentComponentInterface);

  getPhotoWithURL(schoolId: string, photoURL: string, studentComponentInterface: StudentComponentInterface);


}
