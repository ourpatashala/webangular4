import {Injectable} from "@angular/core";
import {StudentTO} from "../to/StudentTO";
import {StudentConverter} from "./interfaces/StudentConverter";
import {StudentService} from "../service/student.service";
import {CommonConverter} from "./CommonConverter";
import {StudentVO} from "../vo/StudentVO";
/**
 * Created by ravisha on 4/21/17.
 */

@Injectable()
export class StudentConverterImpl extends CommonConverter implements StudentConverter {
  studentVO:StudentVO;
  phoneNumbers:string[];

  constructor(private studentService: StudentService) {
    super()
  }

  addStudentProfile(schoolId : string,studentTO: StudentTO){
    this.studentVO = new StudentVO();
    //Add  All the logic here ,  to convert TO object to VO object.
    this.studentVO.id = studentTO.id;
    this.studentVO.dob = studentTO.dob;
    this.studentVO.schoolId = studentTO.schoolId;
    this.studentVO.firstName = studentTO.firstName;
    this.studentVO.phoneNumbers = this.getArrayDataWithOnlyValues(studentTO.phoneNumbers);
  // this.studentVO.siblings = this.getArrayDataWithKeyValues(studentTO.siblings);
    //this.studentVO.siblings = '{ravi:'raj'}';
     var x:Object;
     var y = 'brother'

    var p = "father:ravisha"
    var  z  =  {p};

    this.studentVO.siblings = z;


    console.log('hello from student controller impl'+studentTO.id)
    this.studentService.addStudentProfileData(this.studentVO.schoolId,this.studentVO)

  }

}
