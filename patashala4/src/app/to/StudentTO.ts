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
export  class StudentTO{
  firstName?: string;
  lastName?: string;
  middleName?: string;
  dob?: string;
  id?: string;
  schoolId?: string;
  one?:string;
  classId?: string;
  gender?: string;
  fatherName?: string;
  motherName?: string;
  remarks?: string;
  schoolName?: string;
  className?: string;
  profilePhotoUrl?: string;
  bloodGroup?: string;
  siblings?:string[];
  phoneNumbers?:string[];
  testing?:string;
  address?:AddressTO;


}
