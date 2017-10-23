import {StudentTO} from "../../to/StudentTO";
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import {CommonInterface} from "../common/CommonInterface";
import {ClassProfileTO} from "../../to/ClassProfileTO";
import {ClassProfileVO} from "../../vo/ClassProfileVO";

export interface StudentComponentInterface extends  CommonInterface{
  /**
   * This is a call back method
   * @param schoolProfileTO
   */
  displayStudentCallBack(studentTO: StudentTO);

  /**
   * Used for displaying all the students profile information.
   * @param schoolProfileTO
   */
  displayAllStudentCallBack(studentTO:FirebaseListObservable<StudentTO>);

  displayAllClassesCallBack(classProfileTO:FirebaseListObservable<ClassProfileTO>);

  displayPhotoCallBack(url : string);

  displayPhotoWithURLCallBack(url : string);




}

