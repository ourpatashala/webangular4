
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import {CommonInterface} from "../common/CommonInterface";
import {ClassProfileTO} from "../../to/ClassProfileTO";
import {ClassProfileVO} from "../../vo/ClassProfileVO";
import {ConfigItemsVO} from "../../vo/ConfigItemsVO";

export interface ManageClassesComponentInterface extends  CommonInterface{
  /**
   * This is a call back method
   * @param classProfileTO
   */
  displayClassCallBack(classProfileTO: ClassProfileTO);

  /**
   * Used for displaying all the classes profile information.
   *
   */

  displayAllClassesCallBack(classProfileTOList:FirebaseListObservable<ClassProfileTO>);








}

