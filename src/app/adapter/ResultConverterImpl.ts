import {Injectable} from "@angular/core";
import {CommonConverter} from "./CommonConverter";
import {ResultConverter} from "./interfaces/ResultConverter";
import {ResultTO} from "../to/ResultTO";
import {ResultService} from "../service/result.service";
import {ResultVO} from "../vo/ResultVO";
/**
 * Created by ravisha on 4/21/17.
 */

@Injectable()
export class ResultConverterImpl  extends CommonConverter implements ResultConverter {



  resultVO:ResultVO;

  constructor(private resultService: ResultService) {
    super()
  }

  addResult(schoolId: string, resultTO: ResultTO) {
  }



}
