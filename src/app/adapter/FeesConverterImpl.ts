import {Injectable} from "@angular/core";
import {CommonConverter} from "./CommonConverter";
import {FeesConverter} from "./interfaces/FeesConverter";
import {FeesTO} from "../to/FeesTO";
import {FeesVO} from "../vo/FeesVO";
import {FeesService} from "../service/fees.service";
/**
 * Created by ravisha on 4/21/17.
 */

@Injectable()
export class FeesConverterImpl  extends CommonConverter implements FeesConverter {


  feesVO:FeesVO;

  constructor(private feesService: FeesService) {
    super()
  }

  addFees(schoolId: string, feesTO: FeesTO) {
  }


}
