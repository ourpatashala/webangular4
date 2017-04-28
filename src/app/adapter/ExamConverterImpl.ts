import {Injectable} from "@angular/core";
import {CommonConverter} from "./CommonConverter";
import {ExamConverter} from "./interfaces/ExamConverter";
import {ExamTO} from "../to/ExamTO";
import {ExamService} from "../service/exam.service";
import {ExamVO} from "../vo/ExamVO";
/**
 * Created by ravisha on 4/21/17.
 */

@Injectable()
export class ExamConverterImpl extends CommonConverter implements ExamConverter {

  examVO:ExamVO;

  constructor(private examService: ExamService) {
    super()
  }

  addExam(schoolId: string, examTO: ExamTO) {
  }


}
