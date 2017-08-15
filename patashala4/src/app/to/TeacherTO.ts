import {AddressTO} from "./AddressTO";
/**
 * Created by ravisha on 4/27/17.
 */


export class TeacherTO {
  id: string;
  schoolId:string;
  firstName: string;
  middleName: string;
  lastName: string;
  qualification: string;
  contactNumber: string;
  address:AddressTO;
  classTeacher: string;
  profilePic: string;

}

