import {Injectable} from "@angular/core";
import {MessageTO} from "../to/MessageTO";
import {LogginConstants} from "../constants/LogginConstants";
/**
 * Created by ravisha on 8/31/17.
 */

@Injectable()
export abstract class  DefaultService {

  public  displayOnConsole(status:boolean, messageTo: MessageTO):void {
    if (LogginConstants.LOGGING) {
      console.log("=================================================================================");
      if (status) {
        console.log(messageTo.serviceClassName + "--" + messageTo.serviceMethodName + " call is success.")
      } else {
        console.log(messageTo.serviceClassName + "--" + messageTo.serviceMethodName + " call is failed.")
      }
      console.log("Functionality.." + messageTo.messageType);
      console.log(messageTo.messageInfo);
      console.log("=================================================================================");
    }
  }

}
