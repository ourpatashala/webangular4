/**
 * Created by ravisha on 4/21/17.
 */

import {AddressVO} from "./AddressVO";
/**
 * This is the object that will go to the database, this object will be created by converted , when comming
 * from UI.
 *
 */
export  class StudentVO {

  firstName?: string;
  lastName?: string;
  middleName?: string;
  dob?: string;
  id?: string;
  schoolId?: string;
  one?: string;
  classId?: string;
  gender?: string;
  fatherName?: string;
  motherName?: string;
  remarks?: string;
  schoolName?: string;
  className?: string;
  profilePhotoUrl?: string;
  bloodGroup?: string;
  siblings?: Object;
  phoneNumbers?: Object;
  testing?: string;
  address?: AddressVO;
}
