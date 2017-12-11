import { Component, OnInit,Inject } from '@angular/core';
import { MasterSyllabusComponentInterface } from "./MasterSyllabusComponentInterface";
import { MasterSyllabusTO } from "./../../to/MasterSyllabusTO";
import { MasterSyllabusVO } from "./../../vo/MasterSyllabusVO";
import { MessageTO } from "./../../to/MessageTO";
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

import {MasterSyllabusConverter} from "../../adapter/interfaces/MasterSyllabusConverter";
import {MasterSyllabusConverterImpl} from "../../adapter/impl/MasterSyllabusConverterImpl";
import {inject} from "@angular/core/testing";
import {MasterSyllabusService} from "../../service/master-syllabus.service";
import {ChapterTO} from "../../to/ChapterTO";
import {MasterSubjectService} from "../../service/master-subject.service";

@Component({
  selector: 'app-master-syllabus',
  templateUrl: './master-syllabus.component.html',
  styleUrls: ['./master-syllabus.component.css'],
  providers: [ MasterSyllabusService, MasterSubjectService, {provide: 'MasterSyllabusConverter', useClass: MasterSyllabusConverterImpl}]
})
export class MasterSyllabusComponent implements OnInit, MasterSyllabusComponentInterface {

  constructor(@Inject('MasterSyllabusConverter') private masterSyllabusConverter: MasterSyllabusConverter) { }

  ngOnInit() {
  }

  displayMasterSyllabusCallBack(masterSyllabusTO: MasterSyllabusTO){

    console.log("displayMasterSyllabusCallBack ==> "+ masterSyllabusTO.subjectName);

  }

  displayAllMasterSyllabusCallBack(masterSyllabusTOList:FirebaseListObservable<MasterSyllabusTO>){

    console.log("displayAllMasterSyllabusCallBack ==> "+ masterSyllabusTOList);

    masterSyllabusTOList.forEach(obj => {
      console.log(obj.syllabusName + ' ' + obj.subjectId + ' '+ obj.subjectName);

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

    var masterSyllabusTO = new MasterSyllabusTO();
    //masterSubjectVO.uniqueId = "";

    masterSyllabusTO.syllabusName = "Inter BPC 1st Year Science";
    masterSyllabusTO.subjectName = "SCIENCE";
    masterSyllabusTO.subjectId = "science";


    var chapterList  = new Array <ChapterTO>();

    var chapter1 = new ChapterTO();
    chapter1.chapterName = "Chapter 1 BPC";
    chapter1.serialNo = "1";
    chapter1.completion = "0";
    chapterList[0] = chapter1;

    var chapter2 = new ChapterTO();
    chapter2.chapterName = "Chapter 2 BPC";
    chapter2.serialNo = "2";
    chapter2.completion = "0";
    chapterList[1] = chapter2;

    this.masterSyllabusConverter.addMasterSyllabus("-KwebjvSellhXyBRZbjo",masterSyllabusTO, chapterList,this);

  }

  testUpdate(){

    var masterSyllabusTO = new MasterSyllabusTO();
    //masterSubjectVO.uniqueId = "";

    masterSyllabusTO.syllabusId = "-L-r2Q71r2nlFibQXzpc"
    masterSyllabusTO.syllabusName = "Inter MPC 2ND Year Science";
    masterSyllabusTO.subjectName = "MATHS";
    masterSyllabusTO.subjectId = "maths";

    var chapterList  = new Array <ChapterTO>();

    var chapter1 = new ChapterTO();
    chapter1.chapterName = "Chapter 11";
    chapter1.serialNo = "1";
    chapter1.completion = "0";
    chapterList[0] = chapter1;

    var chapter2 = new ChapterTO();
    chapter2.chapterName = "Chapter 21";
    chapter2.serialNo = "2";
    chapter2.completion = "0";
    chapterList[1] = chapter2;

    var chapter3= new ChapterTO();
    chapter3.chapterName = "Chapter 31";
    chapter3.serialNo = "3";
    chapter3.completion = "0";
    chapterList[2] = chapter3;

    this.masterSyllabusConverter.updateMasterSyllabus("-KwebjvSellhXyBRZbjo","-L-r2Q71r2nlFibQXzpc", masterSyllabusTO, chapterList,this);

  }

  testGet(){

    this.masterSyllabusConverter.getMasterSyllabus("-KwebjvSellhXyBRZbjo","-L-r2Q71r2nlFibQXzpc", this);

  }

  testGetAll(){

    this.masterSyllabusConverter.getAllMasterSyllabus ("-KwebjvSellhXyBRZbjo", this);

  }

  testDelete(){

    this.masterSyllabusConverter.deleteMasterSyllabus("-KwebjvSellhXyBRZbjo", "-L-r3O1-fM__L_tldUGE", this);

  }

}
