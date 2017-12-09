import {MasterSyllabusTO} from "../../to/MasterSyllabusTO";
import {MasterSyllabusComponent} from "../../component/master-syllabus/master-syllabus.component";
import {MasterSyllabusComponentInterface} from "../../component/master-syllabus/MasterSyllabusComponentInterface";
import {ChapterVO} from "../../vo/ChapterVO";
/**
 * Created by ravisha on 7/3/17.
 */
export interface MasterSyllabusConverter {

  addMasterSyllabus(schoolId:string, masterSyllabusTO: MasterSyllabusTO, chapterList: ChapterVO[], masterSyllabusComponentInterface: MasterSyllabusComponentInterface);

  getMasterSyllabus(schoolId: string, subjectId: string, masterSyllabusComponentInterface: MasterSyllabusComponentInterface);

  updateMasterSyllabus(schoolId: string, subjectId: string, masterSyllabusTO: MasterSyllabusTO, chaptersList: ChapterVO[], masterSyllabusComponentInterface: MasterSyllabusComponentInterface);

  deleteMasterSyllabus(schoolid: string, subjectId: string, masterSyllabusComponentInterface: MasterSyllabusComponentInterface);

  getAllMasterSyllabus(schoolId:string, masterSyllabusComponentInterface: MasterSyllabusComponentInterface);

}
