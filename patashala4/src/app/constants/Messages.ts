/**
 * Created by ravisha on 7/12/17.
 */
import {Injectable} from "@angular/core";
@Injectable()
export class Messages{
  public static SCHOOL_EXISTS='A school already exists with same name, cannot update it.';
  public static SCHOOL_NOT_EXISTS='School  not  present.';
  public static SCHOOL_ADDED='School  Added.';
  public static SCHOOL_UPDATED='School  Updated.';
  public static LOGIN_SUCCEFULL = 'User login successfull'
  public static SIGNUP_SUCCEFULL = 'User signup successfull'

  public static STUDENT_EXISTS='A student already exists with same name, cannot update it.';
  public static STUDENT_NOT_EXISTS='Student  not  present.';
  public static STUDENT_ADDED='Student  Added.';
  public static STUDENT_UPDATED='Student  Updated.';



}
