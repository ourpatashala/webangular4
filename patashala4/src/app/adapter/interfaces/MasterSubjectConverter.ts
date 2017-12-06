import {MasterSubjectTO} from "../../to/MasterSubjectTO";
import {MastersubjectComponent} from "../../component/mastersubject/mastersubject.component";
import {MasterSubjectComponentInterface} from "../../component/mastersubject/MasterSubjectComponentInterface";
/**
 * Created by ravisha on 7/3/17.
 */
export interface MasterSubjectConverter {

  addMasterSubject(schoolId:string, masterSubjectTO: MasterSubjectTO, masterSubjectComponentInterface: MasterSubjectComponentInterface);

  getMasterSubject(schoolId: string, subjectId: string, masterSubjectComponentInterface: MasterSubjectComponentInterface);

  updateMasterSubject(schoolId: string, subjectId: string, masterSubjectTO: MasterSubjectTO, masterSubjectComponentInterface: MasterSubjectComponentInterface);

  deleteMasterSubject(schoolid: string, subjectId: string, masterSubjectComponentInterface: MasterSubjectComponentInterface);

  getAllMasterSubject(schoolId:string, masterSubjectComponentInterface: MasterSubjectComponentInterface);

}
