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

  id: string;
  schoolId: string;
  rollNo: string;
  firstName: string;
  lastName: string;
  middleName: string;
  classId: string;
  dob: string;
  mobileNumbers: string[];
  gender: string;
  landLine: string;
  bloodGroup: string;
  //profilePhotoUrl: string;
  fatherName: string;
  motherName: string;
  addressOne: string;
  addressTwo: string;
  city:string;
  state: string;
  country:string;
  pincode:string;

  uniqueId: string;

  toString() {
    return "id : " + this.id + "\n" +
      "schoolId : " + this.schoolId + "\n" +
      "rollNo : " + this.rollNo + "\n" + "" +
      "firstName : " + this.firstName + "\n" +
      "lastName : " + this.lastName + "\n";
  }


}
