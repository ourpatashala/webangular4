import {MasterSyllabusTO} from "../../to/MasterSyllabusTO";
import {MasterSyllabusComponent} from "../../component/master-syllabus/master-syllabus.component";
import {MasterSyllabusComponentInterface} from "../../component/master-syllabus/MasterSyllabusComponentInterface";
import {ChapterVO} from "../../vo/ChapterVO";
/**
 * Created by ravisha on 7/3/17.
 */
export interface MasterSyllabusConverter {

  addMasterSyllabus(schoolId:string, masterSyllabusTO: MasterSyllabusTO, chapterList: ChapterVO[], masterSyllabusComponentInterface: MasterSyllabusComponentInterface);

  getMasterSyllabus(schoolId: string, syllabusId: string, masterSyllabusComponentInterface: MasterSyllabusComponentInterface);

  getChapters(schoolId: string, syllabusId: string, masterSyllabusComponentInterface: MasterSyllabusComponentInterface);


  updateMasterSyllabus(schoolId: string, syllabusId: string, masterSyllabusTO: MasterSyllabusTO, chaptersList: ChapterVO[], masterSyllabusComponentInterface: MasterSyllabusComponentInterface);

  deleteMasterSyllabus(schoolid: string, syllabusId: string, masterSyllabusComponentInterface: MasterSyllabusComponentInterface);

  getAllMasterSyllabus(schoolId:string, masterSyllabusComponentInterface: MasterSyllabusComponentInterface);

}
