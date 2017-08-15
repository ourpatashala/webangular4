/**
 * Created by ravisha on 4/27/17.
 */
import {ContactTO} from "../../to/ContactTO";
/**
 * Created by ravisha on 4/21/17.
 */


export interface ContactConverter {
  addContact(schoolId : string, contactTO: ContactTO);
}
