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
    //  if(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID) == null){
    //   this.router.navigate(['/']);
    //  }      
     this.fb = fb;  
}

  ngOnInit() {
    this.subjectFormGroup = this.fb.group({
      subjectName: [''],
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
        this.subjectindexcount++;
      });
      console.log('Display all Subjects');
      this.rerender();
      
}
  successMessageCallBack(messageTO:MessageTO) {
    console.log("successMessageCallBack ==>" + messageTO.messageInfo+"  "+ messageTO.messageType+"  "+messageTO.serviceClassName+"  "+messageTO.serviceMethodName);
    if(messageTO.serviceMethodName=="searchAndAddMasterSubject()"){     
      this.showSubjectList();
    }
    if (messageTO.serviceMethodName == "updateMasterSubject()")
    {
     this.popupstatus = "1";
     this.showSubjectList();
   }
    this.sucessMessage = messageTO.messageInfo;
    if (messageTO.messageInfo.length != 0) {
      this.active = "1";
    }
     else {
      this.active = "0";
    }
  }

  closePopup() {
    this.sucessMessage = "";
    this.active = "0";
    if (this.popupstatus == "1") this.showSubjectList();  
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
    this.updateMessage(this.errorMessage);   
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
    this.subjectFormGroup.controls['subjectName'].patchValue('');
    this.subjectFormGroup.controls['subjectId'].patchValue(this.subjectindexcount+1);
    this.subjectFormGroup.controls['uniqueId'].patchValue('');
     console.log(this.div_Element_Id);    
  }

  checkedmasterSubject(value){
       if ((<HTMLInputElement>document.getElementById(value)).checked === true) {
        this.selectedSubjectArray.push(value);
      } else if ((<HTMLInputElement>document.getElementById(value)).checked === false) {
        let indexx = this.selectedSubjectArray.indexOf(value);
        this.selectedSubjectArray.splice(indexx, 1)
      }  
    }

    deleteCourse(){
      for (var loopvar = 0; loopvar < this.selectedSubjectArray.length; loopvar++) {
        console.log(this.selectedSubjectArray[loopvar]);
        this.masterSubjectConverter.deleteMasterSubject(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID), this.selectedSubjectArray[loopvar], this);
      }
      this.selectedSubjectArray= [];
      this.showSubjectList();  
    }

    addSubjectSubmit({value,valid}){  
      this.active = "0";
      if(value.subjectName == null || value.subjectName ==""){
        this.errorMessage= "Please enter  subject Name ";
        this.active = "2";
      }        
       else{
        this.masterSubjectConverter.addMasterSubject(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID),value,this);
        this.div_Element_Id='0';  
       }
    }

    showSubjectList()  {
      if (this.selectedSubjectArray.length > 0) (<HTMLInputElement>document.getElementById(this.selectedSubjectArray[0])).checked = false;      
      this.selectedSubjectArray = [];
      this.div_Element_Id='0';
      this.active='0';
      this.errorMessage = "";
      this.masterSubjectConverter.getAllMasterSubject(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID),this);
    }
  
    getselectedSubjectProfile(){
      this.div_Element_Id = "2";    
      this.masterSubjectConverter.getMasterSubject(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID), this.selectedSubjectArray[0],this);
      console.log(this.selectedSubjectArray[0]);
    }
  updateSubmit({value,valid}){ 
    this.active = "0";
      if(value.subjectName == null || value.subjectName ==""){
        this.errorMessage= "Please enter  subject Name ";
        this.active = "2";
      }   
      else{
        this.masterSubjectConverter.updateMasterSubject(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID),this.selectedSubjectArray[0],value,this);
      }  
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
