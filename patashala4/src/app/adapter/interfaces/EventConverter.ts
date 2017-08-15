
/**
 * Created by ravisha on 4/27/17.
 */
import {EventTO} from "../../to/EventTO";
/**
 * Created by ravisha on 4/21/17.
 */


export interface EventConverter {
  addEvent(schoolId : string, eventTO: EventTO);
}
