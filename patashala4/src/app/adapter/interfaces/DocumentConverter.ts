/**
 * Created by ravisha on 4/27/17.
 */
import {DocumentTO} from "../../to/DocumentTO";
/**
 * Created by ravisha on 4/21/17.
 */


export interface DocumentConverter {
  addDocument(schoolId : string, documentTO: DocumentTO);
}
