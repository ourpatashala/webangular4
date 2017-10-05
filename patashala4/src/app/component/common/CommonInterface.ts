import {MessageTO} from "../../to/MessageTO";
/**
 * Created by ravisha on 8/4/17.
 */
export interface CommonInterface {
  /**
   * method  that will be called for the success message.
   * @param message
   */
  successMessageCallBack(messageTO:MessageTO);


  /**
   * Used for displaying error message.
   * @param message
   */
  errorMessageCallBack(messageTO:MessageTO);
}
