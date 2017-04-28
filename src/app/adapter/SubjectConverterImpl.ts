import {Injectable} from "@angular/core";
import {CommonConverter} from "./CommonConverter";
import {SubjectConverter} from "./interfaces/SubjectConverter";
import {SubjectTO} from "../to/SubjectTO";
import {SubjectService} from "../service/subject.service";
import {SubjectVO} from "../vo/SubjectVO";
/**
 * Created by ravisha on 4/21/17.
 */

@Injectable()
export class SubjectConverterImpl  extends CommonConverter implements SubjectConverter {
  subjectVO:SubjectVO;

  constructor(private subjectService: SubjectService) {
    super()
  }

  addSubject(schoolId: string, subjectTO: SubjectTO) {
  }



}
