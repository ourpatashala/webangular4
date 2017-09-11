/**
 * Created by ravisha on 4/21/17.
 */

import {AddressVO} from "./AddressVO";
import {NameValueVO} from "./NameValueVO";
/**
 * This is the object that will go to the database, this object will be created by converted , when comming
 * from UI.
 *
 */
export  class StudentVO {

  id?: string;
  schoolId?: string;
  rollNo?: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  classId?: string;
  dob?: string;
  mobileNumber?: string;
  gender?: string;
  landLine?: string;
  bloodGroup?: string;
  profilePhotoUrl?: string;
  fatherName?: string;
  motherName?: string;
  uniqueId: string;
}
