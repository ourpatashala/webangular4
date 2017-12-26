import {MasterSubjectTO} from "../../to/MasterSubjectTO";
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import {CommonInterface} from "../common/CommonInterface";
import {ChapterTO} from '../../to/ChapterTO'


export interface MasterSyllabusComponentInterface extends  CommonInterface{

  displayMasterSyllabusCallBack(masterSubjectTO: MasterSubjectTO);

  displayAllMasterSyllabusCallBack(masterSubjectTO:FirebaseListObservable<MasterSubjectTO>);

  displayAllChaptersCallBack(chapters:FirebaseListObservable<ChapterTO>);


}

