/**
 * Created by ravisha on 4/27/17.
 */
import {MessageTO} from "../../to/MessageTO";
/**
 * Created by ravisha on 4/21/17.
 */


export interface MessageConverter {
  addMessage(schoolId : string, contactTO: MessageTO);
}
