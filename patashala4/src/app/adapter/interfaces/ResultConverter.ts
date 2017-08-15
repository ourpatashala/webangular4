/**
 * Created by ravisha on 4/27/17.
 */
import {ResultTO} from "../../to/ResultTO";
/**
 * Created by ravisha on 4/21/17.
 */


export interface ResultConverter {
  addResult(schoolId : string, resultTO: ResultTO);
}
