/**
 * Created by ravisha on 4/27/17.
 */

import {TeacherTO} from "../../to/TeacherTO";
/**
 * Created by ravisha on 4/21/17.
 */


export interface TeacherConverter {
  addTeacherProfile(schoolId : string,teacherTO: TeacherTO);
}
