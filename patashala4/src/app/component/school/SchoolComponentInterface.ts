import {SchoolProfileTO} from "../../to/SchoolProfileTO";
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import {CommonInterface} from "../common/CommonInterface";
/**
 * Created by ravisha on 7/7/17.
 */
export interface SchoolComponentInterface extends  CommonInterface{
  /**
   * This is a call back method
   * @param schoolProfileTO
   */
  displaySchoolProfileCallBack(schoolProfileTO: SchoolProfileTO);

  /**
   * Used for displaying all the school profile information.
   * @param schoolProfileTO
   */
  displayAllSchoolProfileCallBack(schoolProfileTO:FirebaseListObservable<SchoolProfileTO>);
}
