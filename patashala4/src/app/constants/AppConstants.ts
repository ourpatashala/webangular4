
/**
 * Created by ravisha on 4/28/17.
 */
import {Injectable} from "@angular/core";
@Injectable()
export class AppConstants{
  public static TEST_CONSTANT='Test Constant';
  public static PhotoMaxSize =100000;
  public static IMAGE_ERROR_MESSAGE ='Cannot upload images more than 100KB';

  public static SHAREDPREFERANCE_SCHOOLID ="SchoolID";
  public static SHAREDPREFERANCE_STUDENTID ="StudentID";
  public static SHAREDPREFERANCE_STUDENTCLASSID ="ClassID";
  public static SHAREDPREFERANCE_STUDENTCLASSNAME ="ClassName";
  public static SHAREDPREFERANCE_SCHOOLNAME ="schoolName";

  public static DEFAULT_STUDENT_IMAGE ="./assets/images/profile/default.jpg";
  public static DEFAULT_SCHOOL_LOGO ="./assets/images/profile/default.jpg";
  public static month_names_short= ['','Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


}
