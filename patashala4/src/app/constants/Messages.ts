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

  public static SCHOOL_ID_EMPTY='Invalid School Id!!';


  public static MASTERSUBJECT_EXISTS='A subject already exists with same name, cannot update it.';
  public static MASTERSUBJECT_NOT_EXISTS='Subject  not  present.';
  public static MASTERSUBJECT_ADDED='Subject Added Successfully!!';
  public static MASTERSUBJECT_UPDATED='Subject Updated Successfully!!';
  public static MASTERSUBJECT_DELETED='Subject Deleted Successfully!! ';
  public static MASTERSUBJECTL_DELETED_DENIED='Subject Delete Denied!! There are child objects associated to this school.';

  public static MASTERSYLLABUS_EXISTS='A syllabus already exists with same name, cannot update it.';
  public static MASTERSYLLABUS_NOT_EXISTS='syllabus  not  present.';
  public static MASTERSYLLABUS_ADDED='Syllabus Added Successfully!!';
  public static MASTERSYLLABUS_UPDATED='Syllabus Updated Successfully!!';
  public static MASTERSYLLABUS_DELETED='Syllabus Deleted Successfully!! ';
  public static MASTERSYLLABUS_DELETED_DENIED='Syllabus Delete Denied!! There are child objects associated to this school.';

}
