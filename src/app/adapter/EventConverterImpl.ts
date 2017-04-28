import {Injectable} from "@angular/core";
import {CommonConverter} from "./CommonConverter";
import {EventConverter} from "./interfaces/EventConverter";
import {EventTO} from "../to/EventTO";
import {EventVO} from "../vo/EventVO";
import {EventService} from "../service/event.service";
/**
 * Created by ravisha on 4/21/17.
 */

@Injectable()
export class EventConverterImpl extends CommonConverter implements EventConverter {

  eventVO:EventVO;

  constructor(private eventService: EventService) {
    super()
  }

  addEvent(schoolId: string, eventTO: EventTO) {
  }


}
