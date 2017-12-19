import { Component, OnInit,Inject } from '@angular/core';
import { MasterCourseComponentInterface } from "./MasterCourseComponentInterface";
import { MasterCourseTO } from "./../../to/MasterCourseTO";
import { MasterCourseVO } from "./../../vo/MasterCourseVO";
import { MessageTO } from "./../../to/MessageTO";
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database-deprecated';

import {MasterCourseConverter} from "../../adapter/interfaces/MasterCourseConverter";
import {MasterCourseConverterImpl} from "../../adapter/impl/MasterCourseConverterImpl";
import {inject} from "@angular/core/testing";

import {MasterCourseService} from "../../service/master-course.service";
import {MasterSyllabusService} from "../../service/master-syllabus.service";
import {MasterSubjectService} from "../../service/master-subject.service";

import {SyllabusIdNameTO} from "../../to/SyllabusIdNameTO";

@Component({
  selector: 'app-master-course',
  templateUrl: './master-course.component.html',
  styleUrls: ['./master-course.component.css'],
  providers: [ MasterCourseService,MasterSyllabusService,MasterSubjectService, {provide: 'MasterCourseConverter', useClass: MasterCourseConverterImpl}]
})
export class MasterCourseComponent implements OnInit {

  constructor(@Inject('MasterCourseConverter') private masterCourseConverter: MasterCourseConverter) { }

  ngOnInit() {
  }

  displayMasterCourseCallBack(masterCourseTO: MasterCourseTO){

    console.log("displayMasterCourseCallBack ==> "+ masterCourseTO.courseName + " " + masterCourseTO.courseId);
    for (var iIndex=0; iIndex < masterCourseTO.syllabusList.length; iIndex++){
      console.log("syllabus ==> "+ masterCourseTO.syllabusList[iIndex].syllabusName );
    }


  }

  displayAllMasterCourseCallBack(masterCourseTOList:FirebaseListObservable<MasterCourseTO>){

    console.log("displayAllMasterCourseCallBack ==> "+ masterCourseTOList);

    masterCourseTOList.forEach(obj => {
      console.log(obj.courseId + ' ' + obj.courseName );
      for (var iIndex=0; iIndex < obj.syllabusList.length; iIndex++){
        console.log("syllabus ==> "+ obj.syllabusList[iIndex].syllabusName );
      }

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

    var masterCourseTO = new MasterCourseTO();
    //masterSubjectVO.uniqueId = "";

    masterCourseTO.courseName = "Inter 2nd Year";

    var syllabusList = new Array <SyllabusIdNameTO> ( );
    var syllabus1 = new SyllabusIdNameTO();

    syllabus1.syllabusName = "Science 2nd Year"
    syllabus1.syllabusId = syllabus1.syllabusName.toLowerCase()

    syllabusList[0] = syllabus1

    var syllabus2 = new SyllabusIdNameTO();
    syllabus2.syllabusName = "Maths 2nd Year"
    syllabus2.syllabusId = syllabus2.syllabusName.toLowerCase()

    syllabusList[1] = syllabus2

    masterCourseTO.syllabusList = syllabusList


    this.masterCourseConverter.addMasterCourse("-KwebjvSellhXyBRZbjo",masterCourseTO,this);

  }

  testUpdate(){

    var masterCourseTO = new MasterCourseTO();
    //masterSubjectVO.uniqueId = "";

    //masterCourseTO.courseId = '-L055eRXjeZ09DvqdyXe';
    masterCourseTO.courseName = "Inter 2nd Years";

    var syllabusList = new Array <SyllabusIdNameTO> ( );
    var syllabus1 = new SyllabusIdNameTO();

    syllabus1.syllabusName = "Science 2nd Year"
    syllabus1.syllabusId = syllabus1.syllabusName.toLowerCase()

    syllabusList[0] = syllabus1

    var syllabus2 = new SyllabusIdNameTO();
    syllabus2.syllabusName = "Maths 2nd Year"
    syllabus2.syllabusId = syllabus2.syllabusName.toLowerCase()

    syllabusList[1] = syllabus2

    masterCourseTO.syllabusList = syllabusList



    this.masterCourseConverter.updateMasterCourse("-KwebjvSellhXyBRZbjo","-L055eRXjeZ09DvqdyXe", masterCourseTO,this);

  }

  testGet(){

    this.masterCourseConverter.getMasterCourse("-KwebjvSellhXyBRZbjo","-L050YFABwj4eciWWkv2", this);

  }

  testGetAll(){

    this.masterCourseConverter.getAllMasterCourse ("-KwebjvSellhXyBRZbjo", this);

  }

  testDelete(){

    this.masterCourseConverter.deleteMasterCourse("-KwebjvSellhXyBRZbjo", "-L-r3O1-fM__L_tldUGE", this);

  }

}
