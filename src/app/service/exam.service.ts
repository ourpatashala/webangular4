import { Injectable } from '@angular/core';
import {AngularFire} from "angularfire2";

@Injectable()
export class ExamService {

  firebaseApp: any;

  constructor(af: AngularFire) {
    this.firebaseApp =af;
  }

}
