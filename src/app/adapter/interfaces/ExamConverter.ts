/**
 * Created by ravisha on 4/27/17.
 */
import {ContactTO} from "../../to/ContactTO";
import {ExamTO} from "../../to/ExamTO";
/**
 * Created by ravisha on 4/21/17.
 */


export interface ExamConverter {
  addExam(schoolId : string, examTO: ExamTO);
}
