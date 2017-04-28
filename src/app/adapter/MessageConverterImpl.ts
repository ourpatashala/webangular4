import {Injectable} from "@angular/core";
import {CommonConverter} from "./CommonConverter";
import {MessageConverter} from "./interfaces/MessageConverter";
import {MessageService} from "../service/message.service";
import {MessageTO} from "../to/MessageTO";
import {MessageVO} from "../vo/MessageVO";
/**
 * Created by ravisha on 4/21/17.
 */

@Injectable()
export class MessageConverterImpl  extends CommonConverter implements MessageConverter {


  messageVO:MessageVO;

  constructor(private messageService: MessageService) {
    super()
  }

  addMessage(schoolId: string, messageTO: MessageTO) {
  }



}
