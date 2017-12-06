import {MasterSubjectTO} from "../../to/MasterSubjectTO";
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import {CommonInterface} from "../common/CommonInterface";


export interface MasterSubjectComponentInterface extends  CommonInterface{

  displayMasterSubjectCallBack(masterSubjectTO: MasterSubjectTO);

  displayAllMasterSubjectCallBack(masterSubjectTO:FirebaseListObservable<MasterSubjectTO>);

}

