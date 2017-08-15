/**
 * Created by ravisha on 4/27/17.
 */
import {FeesTO} from "../../to/FeesTO";
/**
 * Created by ravisha on 4/21/17.
 */


export interface FeesConverter {
  addFees(schoolId : string, feesTO: FeesTO);
}
