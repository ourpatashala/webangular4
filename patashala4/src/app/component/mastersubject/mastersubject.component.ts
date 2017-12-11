import { Component, OnInit, Inject } from '@angular/core';
import { MasterSubjectComponentInterface } from "./MasterSubjectComponentInterface";
import { MasterSubjectTO } from "./../../to/MasterSubjectTO";
import { MasterSubjectVO } from "./../../vo/MasterSubjectVO";

import { MessageTO } from "./../../to/MessageTO";
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {MasterSubjectConverter} from "../../adapter/interfaces/MasterSubjectConverter";
import {MasterSubjectConverterImpl} from "../../adapter/impl/MasterSubjectConverterImpl";
import {inject} from "@angular/core/testing";
import {MasterSubjectService} from "../../service/master-subject.service";

@Component({
  selector: 'app-mastersubject',
  templateUrl: './mastersubject.component.html',
  styleUrls: ['./mastersubject.component.css'],
  providers: [ MasterSubjectService, {provide: 'MasterSubjectConverter', useClass: MasterSubjectConverterImpl}]
})
export class MastersubjectComponent implements OnInit, MasterSubjectComponentInterface {

  constructor(@Inject('MasterSubjectConverter') private masterSubjectConverter: MasterSubjectConverter) { }

  ngOnInit() {
  }

  displayMasterSubjectCallBack(masterSubjectTO: MasterSubjectTO){

    console.log("displayMasterSubjectCallBack ==> "+ masterSubjectTO.subjectName);

  }

  displayAllMasterSubjectCallBack(masterSubjectTOList:FirebaseListObservable<MasterSubjectTO>){

    console.log("displayAllMasterSubjectCallBack ==> "+ masterSubjectTOList);

    masterSubjectTOList.forEach(obj => {
      console.log(obj.subjectId + ' '+ obj.subjectName);

    });

  }

  successMessageCallBack(messageTO:MessageTO) {
    console.log("successMessageCallBack ==>" + messageTO.messageInfo+"  "+ messageTO.messageType+"  "+messageTO.serviceClassName+"  "+messageTO.serviceMethodName);

  }

  /**
   * Handle all the error messages here . Basing on the error message decide where you want to display
   * the Error Message, Also if required you can recirect to any page basing on the navigate method
   * given below.
   *
   * @param message
   */
  errorMessageCallBack(messageTO:MessageTO) {
    console.log("errorMessageCallBack ==>" + messageTO.messageInfo);

  }

  testAdd(){

    var masterSubjectTO = new MasterSubjectTO();
    //masterSubjectVO.uniqueId = "";

    masterSubjectTO.subjectName = "SCIENCE 2";



    this.masterSubjectConverter.addMasterSubject("-KwebjvSellhXyBRZbjo",masterSubjectTO, this);

    masterSubjectTO.subjectName = "Physics";


    this.masterSubjectConverter.addMasterSubject("-KwebjvSellhXyBRZbjo",masterSubjectTO, this);

    masterSubjectTO.subjectName = "Hindi";


    this.masterSubjectConverter.addMasterSubject("-KwebjvSellhXyBRZbjo",masterSubjectTO, this);

  }

  testUpdate(){

    var masterSubjectTO = new MasterSubjectTO();
    //masterSubjectVO.uniqueId = "";

    masterSubjectTO.subjectId = "science";
    masterSubjectTO.subjectName = "SCIENCE 2";

    this.masterSubjectConverter.updateMasterSubject("-KwebjvSellhXyBRZbjo",masterSubjectTO.subjectId, masterSubjectTO, this);

  }

  testGet(){

    this.masterSubjectConverter.getMasterSubject("-KwebjvSellhXyBRZbjo","science", this);

  }

  testGetAll(){

    this.masterSubjectConverter.getAllMasterSubject ("-KwebjvSellhXyBRZbjo", this);

  }

  testDelete(){

    this.masterSubjectConverter.deleteMasterSubject("-KwebjvSellhXyBRZbjo", "hindi", this);

  }

}
