import {AddressVO} from "./AddressVO";
/**
 * Created by ravisha on 4/27/17.
 */
export class TeacherVO {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  qualification: string;
  contactNumber: string;
  address:AddressVO;
  classTeacher: string;
  profilePic: string;
}
