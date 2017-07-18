import {SchoolProfileTO} from "../../to/SchoolProfileTO";
/**
 * Created by ravisha on 7/7/17.
 */
export interface SchoolComponentInterface {
  /**
   * This is a call back method
   * @param schoolProfileTO
   */
  displaySchoolProfileCallBack(schoolProfileTO: SchoolProfileTO);

  /**
   * Used for displaying all the school profile information.
   * @param schoolProfileTO
   */
  displayAllSchoolProfileCallBack(schoolProfileTO: Map<string,SchoolProfileTO>);


  /**
   * method  that will be called for the success message.
   * @param message
   */
  successMessageCallBack(message:string);

}
