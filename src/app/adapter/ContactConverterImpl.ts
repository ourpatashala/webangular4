import {Injectable} from "@angular/core";
import {CommonConverter} from "./CommonConverter";
import {ContactConverter} from "./interfaces/ContactConverter";
import {ContactTO} from "../to/ContactTO";
import {ContactService} from "../service/contact.service";
import {ContactVO} from "../vo/ContactVO";
/**
 * Created by ravisha on 4/21/17.
 */

@Injectable()
export class ContactConverterImpl extends CommonConverter implements ContactConverter {



  contactVO:ContactVO;

  constructor(private contactService: ContactService) {
    super()
  }

  addContact(schoolId: string, contactTO: ContactTO) {
  }


}
