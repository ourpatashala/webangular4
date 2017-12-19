import {MasterCourseTO} from "../../to/MasterCourseTO";
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import {CommonInterface} from "../common/CommonInterface";


export interface MasterCourseComponentInterface extends  CommonInterface{

  displayMasterCourseCallBack(masterCourseTO: MasterCourseTO);

  displayAllMasterCourseCallBack(masterCourseTO:FirebaseListObservable<MasterCourseTO>);

}

