import {Injectable} from "@angular/core";
import {CommonConverter} from "./CommonConverter";
import {StudentVO} from "../vo/StudentVO";
import {TeacherConverter} from "./interfaces/TeacherConverter";
import {TeacherTO} from "../to/TeacherTO";
import {TeacherVO} from "../vo/TeacherVO";
import {TeacherService} from "../service/teacher.service";
/**
 * Created by ravisha on 4/21/17.
 */

@Injectable()
export class TeacherConverterImpl extends CommonConverter implements TeacherConverter {


  teacherVO:TeacherVO;

  constructor(private teacherService: TeacherService) {
    super()
  }

  addTeacherProfile(schoolId: string, teacherTO: TeacherTO) {
    this.teacherVO = new TeacherVO();
    //Add  All the logic here ,  to convert TO object to VO object.
    this.teacherVO.id = teacherTO.id;
    this.teacherVO.firstName = teacherTO.firstName;
    this.teacherVO.lastName = teacherTO.lastName;
    this.teacherVO.middleName = teacherTO.middleName;
    this.teacherVO.qualification = teacherTO.qualification;
    this.teacherVO.classTeacher = teacherTO.classTeacher;
    this.teacherVO.profilePic = teacherTO.profilePic;
    this.teacherVO.address = teacherTO.address;
    this.teacherVO.contactNumber = teacherTO.contactNumber;
    this.teacherService.addTeacherProfile(schoolId,this.teacherVO)
  }

}
