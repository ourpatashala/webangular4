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

  }

}
