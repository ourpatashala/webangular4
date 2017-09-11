/**
 * Created by ravisha on 4/21/17.
 */

import {AddressTO} from "./AddressTO";
/**
 * Used as transfer object between different layers in the application, this object
 * will keep moving between adapter layer and component layer.
 * Any Transfer Object will end its life at Converter layer or Component Layer.
 * Transfer Object(TO) is the one that comes from UI.
 * Value Object( VO) is the one that goes to the database and its scope is within service layer only.
 *
 */
export class StudentTO {

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

  toString() {
    return "id : " + this.id + "\n" +
      "schoolId : " + this.schoolId + "\n" +
      "rollNo : " + this.rollNo + "\n" + "" +
      "firstName : " + this.firstName + "\n" +
      "lastName : " + this.lastName + "\n";
  }


}
