/**
 * Created by ravisha on 8/4/17.
 */
export interface CommonInterface {
  /**
   * method  that will be called for the success message.
   * @param message
   */
  successMessageCallBack(message:string);


  /**
   * Used for displaying error message.
   * @param message
   */
  errorMessageCallBack(message:string);
}
