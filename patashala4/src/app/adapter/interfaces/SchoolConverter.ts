import {SchoolProfileTO} from "../../to/SchoolProfileTO";
import {SchoolComponent} from "../../component/school/school.component";
import {SchoolComponentInterface} from "../../component/school/SchoolComponentInterface";
/**
 * Created by ravisha on 7/3/17.
 */
export interface SchoolConverter {
  addSchoolProfile(schoolProfileTO: SchoolProfileTO,schoolComponentInterface:SchoolComponentInterface);
  updateSchoolProfile(schoolProfileTO: SchoolProfileTO,schoolComponentInterface:SchoolComponentInterface);
  deleteSchoolProfile(schoolid: string);
  getSchoolProfile(schoolId:string,schoolComponentInterface:SchoolComponentInterface);
  getSchoolProfileRange(start:string,end:string,schoolComponentInterface:SchoolComponentInterface);
  getAllSchoolProfile(schoolComponentInterface:SchoolComponentInterface);


}
