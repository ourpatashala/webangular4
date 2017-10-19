/**
 * Created by ravisha on 7/12/17.
 */
import {Injectable} from "@angular/core";
@Injectable()
export class Messages{
  public static SCHOOL_EXISTS='A school already exists with same name, cannot update it.';
  public static SCHOOL_NOT_EXISTS='School  not  present.';
  public static SCHOOL_ADDED='School Added Successfully!!';
  public static SCHOOL_UPDATED='School Updated Successfully!!';
  public static SCHOOL_DELETED='School Deleted Successfully!! ';
  public static SCHOOL_DELETED_DENIED='School Delete Denied!! There are child objects associated to this school.';
  public static LOGIN_SUCCEFULL = 'User login Successful'
  public static SIGNUP_SUCCEFULL = 'User signup successful'

  public static STUDENT_EXISTS='Student update Denied!! A student already exists with same name.';
  public static STUDENT_NOT_EXISTS='Student  not  present.';
  public static STUDENT_ADDED='Student Added Successfully!!';
  public static STUDENT_UPDATED='Student Updated Successfully!!';



}
