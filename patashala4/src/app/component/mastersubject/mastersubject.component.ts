import { Component, OnInit, Inject } from '@angular/core';
import {ViewChild} from '@angular/core';
import { MasterSubjectComponentInterface } from "./MasterSubjectComponentInterface";
import { MasterSubjectTO } from "./../../to/MasterSubjectTO";
import { MasterSubjectVO } from "./../../vo/MasterSubjectVO";
import {BehaviorSubject, Observable, Subscription} from "rxjs";

import { MessageTO } from "./../../to/MessageTO";
import {Router} from "@angular/router";
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database-deprecated';
import {MasterSubjectConverter} from "../../adapter/interfaces/MasterSubjectConverter";
import {MasterSubjectConverterImpl} from "../../adapter/impl/MasterSubjectConverterImpl";
import {inject} from "@angular/core/testing";
// import {BehaviorSubject, Observable, Subscription} from "rxjs";
declare var $: any;
import {Subject} from 'rxjs/Rx';
import {DataTableDirective} from 'angular-datatables';
import {MasterSubjectService} from "../../service/master-subject.service";
import {FormBuilder, FormControl, FormGroup,FormArray} from "@angular/forms";
import { AppConstants } from "../../constants/AppConstants";


@Component({
  selector: 'app-mastersubject',
  templateUrl: './mastersubject.component.html',
  styleUrls: ['./mastersubject.component.css'],
  providers: [ MasterSubjectService, {provide: 'MasterSubjectConverter', useClass: MasterSubjectConverterImpl}]
})
export class MastersubjectComponent implements OnInit, MasterSubjectComponentInterface {

  subjectFormGroup:FormGroup;
  masterSubjectTO : MasterSubjectTO;
  errorMessage: string;
  sucessMessage: string;
  masterSubjectTOList: FirebaseListObservable<MasterSubjectTO>;
  fb: FormBuilder;
  active: string = "0";// for error and success divs;;  0 for no content, 1 for success, 2 for error
  div_Element_Id: string = '0';//for multiple pages in school list page;; 0 to show list of school , 1 to show add school, 2 to show edit school, 3 to show single school view.
  subjectindexcount: number =0;
  selectedSubjectArray: Array<any> = []; 
  updateSubject: BehaviorSubject<string> = new BehaviorSubject<string>(""); // Holds the error message
  popupstatus: string = "0"; //0 for default close //1 for close and show listing
  showupload: string = "0"; //0 for default close //1 for close and show listing
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  flag: boolean = false;






  update$: Observable<string> = this.updateSubject.asObservable(); // observer for the above message









  constructor(@Inject('MasterSubjectConverter') private masterSubjectConverter: MasterSubjectConverter,fb: FormBuilder, private router: Router) {
     this.masterSubjectConverter.getAllMasterSubject(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID), this);
     if(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID) == null){
      this.router.navigate(['/']);
     } 
     
     
     
     this.fb = fb;  
}




  ngOnInit() {
    this.subjectFormGroup = this.fb.group({
      subjectName: [''],
    // syllabusList: this.fb.array([this.initsyllabusNames()]),
      subjectId: [''],
      uniqueId : ['']
    });
  }

  displayMasterSubjectCallBack(masterSubjectTO: MasterSubjectTO){

    console.log("displayMasterSubjectCallBack ==> "+ masterSubjectTO.subjectName);
    this.subjectFormGroup.controls['subjectId'].patchValue(masterSubjectTO.subjectId);
    this.subjectFormGroup.controls['subjectName'].patchValue(masterSubjectTO.subjectName);
    this.subjectFormGroup.controls['uniqueId'].patchValue(masterSubjectTO.uniqueId);

  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }






  displayAllMasterSubjectCallBack(masterSubjectTOList:FirebaseListObservable<MasterSubjectTO>){
    this.subjectindexcount=0;
    console.log("displayAllMasterSubjectCallBack ==> "+ masterSubjectTOList);
   this.masterSubjectTOList=masterSubjectTOList;
   masterSubjectTOList.forEach(obj => {
    //console.log(obj.syllabusName + ' ' + obj.subjectId + ' '+ obj.subjectName);
    this.subjectindexcount++;
  });
  //  if(this.rerender() == null ){
  //   this.router.navigate(['/']);
  //  }
  //  else{
    this.rerender();
  //  } 
}
  successMessageCallBack(messageTO:MessageTO) {
    console.log("successMessageCallBack ==>" + messageTO.messageInfo+"  "+ messageTO.messageType+"  "+messageTO.serviceClassName+"  "+messageTO.serviceMethodName);
    if(messageTO.serviceMethodName=="searchAndAddMasterSubject()"){
      this.sucessMessage = "subject added successfully";
      this.showSubjectList();
    }
    if (messageTO.serviceMethodName == "updateSubmit()")
    {
     // this.popupstatus = "1";
      this.getselectedSubjectProfile();
  }
    this.sucessMessage = messageTO.messageInfo;
    if (messageTO.messageInfo.length != 0) {
      this.active = "1";
    }
     else {
      this.active = "0";
    }
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
    this.errorMessage = messageTO.messageInfo;
    //this.schoolFormGroup.reset();
    this.updateMessage(this.errorMessage);
    //  this.getRouter().navigate(['/School']);
    if (messageTO.messageInfo.length != 0) {
      this.active = "2";
    } else {
      this.active = "0";
    }
    setTimeout(() => {    //<<<---    using ()=> syntax
      this.errorMessage = "";
      this.active = "0";
    }, 2000);
  
  }


  updateMessage(message: string) { // updates the error message
    this.updateSubject.next(message);
  }







  testAdd(){

    var masterSubjectTO = new MasterSubjectTO();
    //masterSubjectVO.uniqueId = "";

    masterSubjectTO.subjectName = "SCIENCE 2";



    this.masterSubjectConverter.addMasterSubject(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID),masterSubjectTO, this);

    masterSubjectTO.subjectName = "Physics";


    this.masterSubjectConverter.addMasterSubject(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID),masterSubjectTO, this);

    masterSubjectTO.subjectName = "Hindi";


    this.masterSubjectConverter.addMasterSubject(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID),masterSubjectTO, this);

  }

  testUpdate(){

    var masterSubjectTO = new MasterSubjectTO();
    //masterSubjectVO.uniqueId = "";

    masterSubjectTO.subjectId = "science";
    masterSubjectTO.subjectName = "SCIENCE 2";

    this.masterSubjectConverter.updateMasterSubject(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID),masterSubjectTO.subjectId, masterSubjectTO, this);

  }

  testGet(){

    this.masterSubjectConverter.getMasterSubject(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID),"science", this);

  }

  testGetAll(){

    this.masterSubjectConverter.getAllMasterSubject (localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID), this);

  }

  testDelete(){

    this.masterSubjectConverter.deleteMasterSubject(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID), "hindi", this);

  }

  show_addCourseFields(){
    this.div_Element_Id = "1";
    console.log(this.subjectindexcount);

    this.subjectFormGroup.controls['subjectName'].patchValue('');
    this.subjectFormGroup.controls['subjectId'].patchValue(this.subjectindexcount+1);
    this.subjectFormGroup.controls['uniqueId'].patchValue('');
     console.log(this.div_Element_Id);    
  }

  showSubjectList()  {
    if (this.selectedSubjectArray.length > 0) (<HTMLInputElement>document.getElementById(this.selectedSubjectArray[0])).checked = false;      
    this.selectedSubjectArray = [];
    this.div_Element_Id='0';
   // this.active='0';
    this.errorMessage = "";
    console.log("school id "+ localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID));
    this.masterSubjectConverter.getAllMasterSubject(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID), this);
  console.log(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID)); 
  }

  checkedmasterSubject(value){
       if ((<HTMLInputElement>document.getElementById(value)).checked === true) {
        this.selectedSubjectArray.push(value);
      } else if ((<HTMLInputElement>document.getElementById(value)).checked === false) {
        let indexx = this.selectedSubjectArray.indexOf(value);
        this.selectedSubjectArray.splice(indexx, 1)
      }
     // console.log(this.selectedSubjectArray)
    }

    deleteCourse(){
      for (var loopvar = 0; loopvar < this.selectedSubjectArray.length; loopvar++) {
        console.log(this.selectedSubjectArray[loopvar]);
        this.masterSubjectConverter.deleteMasterSubject(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID), this.selectedSubjectArray[loopvar], this);
      }
      this.selectedSubjectArray= [];
      this.showSubjectList();
  
    }

    addSubjectSubmit({value,valid})
    {  
        
        //alert(x);
         console.log(value+"   "+value.subjectName);
        this.masterSubjectConverter.addMasterSubject(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID),value,this);

     // this. masterSubjectTO.subjectName ='';
    }

    getselectedSubjectProfile(){
      this.div_Element_Id = "2";
      //TODO : Shiva integrate code by removing hardcoding of values.
      //this.getStudentProfile("school04", "-KuCWQEmwl1MsTD0SPdb");
      this.masterSubjectConverter.getMasterSubject(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID), this.selectedSubjectArray[0],this);
      console.log(this.selectedSubjectArray[0]);


    }
updateSubmit({value,valid}){

  this.masterSubjectConverter.updateMasterSubject(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID),this.selectedSubjectArray[0],value,this);
  

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
