/**
 * Created by ravisha on 4/27/17.
 */
import {SubjectTO} from "../../to/SubjectTO";
/**
 * Created by ravisha on 4/21/17.
 */


export interface SubjectConverter {
  addSubject(schoolId : string, subjectTO: SubjectTO);
}
