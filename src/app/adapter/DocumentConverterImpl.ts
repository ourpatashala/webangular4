import {Injectable} from "@angular/core";
import {CommonConverter} from "./CommonConverter";
import {DocumentConverter} from "./interfaces/DocumentConverter";
import {DocumentTO} from "../to/DocumentTO";
import {DocumentService} from "../service/document.service";
import {DocumentVO} from "../vo/DocumentVO";
/**
 * Created by ravisha on 4/21/17.
 */

@Injectable()
export class DocumentConverterImpl extends CommonConverter implements DocumentConverter {
  documentVO:DocumentVO;
  constructor(private documentService: DocumentService) {
    super()
  }

  addDocument(schoolId: string, documentTO: DocumentTO) {
  }


}
