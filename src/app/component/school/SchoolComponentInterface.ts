import {SchoolProfileTO} from "../../to/SchoolProfileTO";
import { FirebaseListObservable} from "angularfire2";
import {CommonInterface} from "../common/CommonInterface";
/**
 * Created by ravisha on 7/7/17.
 */
export interface SchoolComponentInterface extends  CommonInterface{
  /**
   * This is a call back method
   * @param schoolProfileTO
   */
  displaySchoolProfileCallBack(schoolProfileTO: SchoolProfileTO);

  /**
   * Used for displaying all the school profile information.
   * @param schoolProfileTO
   */
  displayAllSchoolProfileCallBack(schoolProfileTO:FirebaseListObservable<SchoolProfileTO>);
}
