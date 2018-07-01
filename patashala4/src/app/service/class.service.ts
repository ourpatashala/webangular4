import {Injectable} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database-deprecated';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import {MessageTO} from "../to/MessageTO";



import {PathUtil} from "../util/PathUtil";
import {ClassProfileVO} from "../vo/ClassProfileVO";
import {NodeConstants} from "../constants/NodeConstants";
import {StudentComponentInterface} from "../component/student/StudentComponentInterface";
import {Messages} from "../constants/Messages";
import {FirebaseObjectObservable} from "angularfire2/database-deprecated/firebase_object_observable";
import {ConfigItemsVO} from "../vo/ConfigItemsVO"

@Injectable()
export class ClassService {

  constructor() { }

}
