import { Component, OnInit,Inject } from '@angular/core';
import {ViewChild} from '@angular/core';
import { MasterSyllabusComponentInterface } from "./MasterSyllabusComponentInterface";
import { MasterSubjectComponentInterface } from "./../mastersubject/MasterSubjectComponentInterface";
import { MasterSyllabusTO } from "./../../to/MasterSyllabusTO";
import { MasterSyllabusVO } from "./../../vo/MasterSyllabusVO";
import { MasterSubjectTO } from "./../../to/MasterSubjectTO";
import { MasterSubjectVO } from "./../../vo/MasterSubjectVO";
import { MessageTO } from "./../../to/MessageTO";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database-deprecated';

import {MasterSyllabusConverter} from "../../adapter/interfaces/MasterSyllabusConverter";
import {MasterSyllabusConverterImpl} from "../../adapter/impl/MasterSyllabusConverterImpl";
import {MasterSubjectConverter} from "../../adapter/interfaces/MasterSubjectConverter";
import {MasterSubjectConverterImpl} from "../../adapter/impl/MasterSubjectConverterImpl";
import {inject} from "@angular/core/testing";
declare var $: any;
import {Subject} from 'rxjs/Rx';
import {MasterSyllabusService} from "../../service/master-syllabus.service";
import {ChapterTO} from "../../to/ChapterTO";
import {DataTableDirective} from 'angular-datatables';
import {SyllabusIdNameTO} from "../../to/SyllabusIdNameTO";
import {FormBuilder, FormControl, FormGroup,FormArray} from "@angular/forms";
import {MasterSubjectService} from "../../service/master-subject.service";
import { AppConstants } from '../../constants/AppConstants';





@Component({
  selector: 'app-master-syllabus',
  templateUrl: './master-syllabus.component.html',
  styleUrls: ['./master-syllabus.component.css'],
  providers: [ MasterSyllabusService, MasterSubjectService, {provide: 'MasterSyllabusConverter', useClass: MasterSyllabusConverterImpl},{provide: 'MasterSubjectConverter', useClass: MasterSubjectConverterImpl}]
})
export class MasterSyllabusComponent implements OnInit, MasterSyllabusComponentInterface {

  syllabusFormGroup:FormGroup;
  errorMessage: string;
  sucessMessage: string;
  masterSyllabusTOList: FirebaseListObservable<MasterSyllabusTO>;
  fb: FormBuilder;
  alldata =["Trigonometry","calculas","network&theory"]
  div_Element_Id: string = '0';//for multiple pages in school list page;; 0 to show list of school , 1 to show add school, 2 to show edit school, 3 to show single school view.
  selectedSyllabusArray: Array<any> = [];
  masterSubjectTOList: FirebaseListObservable<MasterSubjectTO>;
  popupstatus: string = "0"; //0 for default close //1 for close and show listing
  showupload: string = "0"; //0 for default close //1 for close and show listing
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  flag: boolean = false;



  constructor(@Inject('MasterSyllabusConverter') private masterSyllabusConverter: MasterSyllabusConverter, @Inject('MasterSubjectConverter') private masterSubjectConverter: MasterSubjectConverter,fb: FormBuilder) {
    this.masterSyllabusConverter.getAllMasterSyllabus(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID),this);
   // this.masterSubjectConverter.getAllMasterSubject(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID), this);
    this.fb = fb;
   }

  ngOnInit() {
    this.syllabusFormGroup = this.fb.group({
      subjectName: [''],
      subjectId: [''],
      syllabusName:[''],
      syllabusId:[''],
      uniqueId:[''],    
      chapterList: this.fb.array([this.initsyllabusNames()]),
    });
  }

  initsyllabusNames() {
    return this.fb.group({
      chapterName:[''],
      chapterId :[''],
     // chapterName :[''],
      serialNo :[''],
      completion: [''],
      uniqueId:['']     
    });
  }




  displayMasterSyllabusCallBack(masterSyllabusTO: MasterSyllabusTO){

    console.log("displayMasterSyllabusCallBack ==> "+ masterSyllabusTO.syllabusName);

  }
  displayMasterSubjectCallBack(masterSubjectTO: MasterSubjectTO){

    console.log("displayMasterSubjectCallBack ==> "+ masterSubjectTO.subjectName);

  }

  displayAllMasterSyllabusCallBack(masterSyllabusTOList:FirebaseListObservable<MasterSyllabusTO>){

    console.log("displayAllMasterSyllabusCallBack ==> "+ masterSyllabusTOList);
    this.masterSyllabusTOList=masterSyllabusTOList;
    masterSyllabusTOList.forEach(obj => {
      console.log(obj.syllabusName + ' ' + obj.subjectId );

    });

  }
  displayAllMasterSubjectCallBack(masterSubjectTOList:FirebaseListObservable<MasterSubjectTO>){

    console.log("displayAllMasterSubjectCallBack ==> "+ masterSubjectTOList);

    masterSubjectTOList.forEach(obj => {
      console.log(obj.subjectName + ' ' + obj.subjectId);

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

  show_addSyllabusFields(){

    this.div_Element_Id = "1";
    console.log(this.div_Element_Id);
    this.masterSubjectConverter.getAllMasterSubject(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID),this)

  }



  addSyllabusSubmit({value, valid})
  {
   var masterSyllabusTO = new MasterSyllabusTO();
   masterSyllabusTO.syllabusId = "2Q71r2nlFibQXzpc"
   masterSyllabusTO.syllabusName = value.syllabusName;  
   masterSyllabusTO.subjectName = "text_data";
   masterSyllabusTO.subjectId = "subjectId";  

     var chapterList = new Array <ChapterTO> ( );
    //  var chapter1 = new ChapterTO();
    //  chapter1.chapterName = value.chapterName
    //  chapter1.serialNo = value.serialNo;
    //  chapter1.completion = value.completion;
    //  chapterList.push(chapter1);


       if (value.chapterList != null) {
      for (var loopvar = 0; loopvar < value.chapterList.length; loopvar++) {
        var chapter2 = new ChapterTO();
        chapter2.chapterName = value.chapterList[loopvar].chapterName;
        chapter2.completion = value.chapterList[loopvar].completion;
        chapter2.serialNo = value.chapterList[loopvar].serialNo;
        chapter2.chapterId = loopvar+""; //chapter2.chapterId.toLowerCase();
        chapter2.uniqueId = loopvar+"";//chapter2.uniqueId.toLowerCase();
        chapterList.push(chapter2)
      }
    }
   
    //ChapterTO.chapterList = chapterList
  //  this.masterSyllabusConverter.addMasterSyllabus(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID),masterSyllabusTO,chapterList,this);
    console.log(masterSyllabusTO,chapterList);
  }

  getselectedSyllabusProfile(){
    this.div_Element_Id = "2";
    this.masterSyllabusConverter.getMasterSyllabus(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID),this.selectedSyllabusArray[0],this);
    
    console.log(this.div_Element_Id);
  }
   checkedmasterSyllabus(value){
      if ((<HTMLInputElement>document.getElementById(value)).checked === true) {
      this.selectedSyllabusArray.push(value);
    } else if ((<HTMLInputElement>document.getElementById(value)).checked === false) {
      let indexx = this.selectedSyllabusArray.indexOf(value);
      this.selectedSyllabusArray.splice(indexx, 1)
    }
    console.log(this.selectedSyllabusArray)
  }

  deleteCourse() {
    for (var loopvar = 0; loopvar < this.selectedSyllabusArray.length; loopvar++) {
      console.log(this.selectedSyllabusArray[loopvar]);
      this.masterSyllabusConverter.deleteMasterSyllabus(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID), this.selectedSyllabusArray[loopvar], this);
     // this.masterCourseConverter.deleteMasterCourse(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID), "-L-r3O1-fM__L_tldUGE", this);

    }
    this.selectedSyllabusArray= [];
    this. showSyllabusList();

  }

  showSyllabusList()
  {
    this.selectedSyllabusArray = [];
    this.div_Element_Id='0';
    this.masterSyllabusConverter.getAllMasterSyllabus(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID), this);

  }

 addSyllabusName() {
      // control refers to your formarray
      const control = <FormArray>this.syllabusFormGroup.controls['chapterList'];
      // add new formgroup
      control.push(this.initsyllabusNames());
    }
deleteSyllabusName(i: number) {
      // control refers to your formarray
      const control = <FormArray>this.syllabusFormGroup.controls['chapterList'];
      // remove the chosen row
      control.removeAt(i);
    }













    ngAfterViewInit(): void {
      this.dtTrigger.next();
    }


    rerender(): void {
      console.log("render call " + this.flag+"   "+this.dtElement);
     
       if (!this.flag && this.dtElement != null) {
        this.flag = true;
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          console.log("shiva 111" +dtInstance);
          // Destroy the table first
          dtInstance.destroy();
          // Call the dtTrigger to rerender again
          console.log("shiva 222 "+this.dtTrigger);
          if(this.dtTrigger!=null)
            this.dtTrigger.next();
          else
            console.log("error as null");
          this.flag = false;
        });
      }

    }









}
