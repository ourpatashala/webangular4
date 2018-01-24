import { Component, OnInit,Inject,Output,EventEmitter } from '@angular/core';
import {ViewChild} from '@angular/core';
import {MasterCourseComponentInterface} from ".././../master-course/MasterCourseComponentInterface";
import {MasterSyllabusComponentInterface} from ".././../master-syllabus/MasterSyllabusComponentInterface";
import {MasterCourseTO} from "../../../to/MasterCourseTO";
import {MasterCourseVO} from "../../../vo/MasterCourseVO";
import {MasterSyllabusTO} from "../../../to/MasterSyllabusTO";
import {MasterSyllabusVO} from "../../../vo/MasterSyllabusVO";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {MessageTO} from "../../../to/MessageTO";
import {Router} from "@angular/router";
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database-deprecated';
declare var $: any;
import {MasterCourseConverter} from "../../../adapter/interfaces/MasterCourseConverter";
import {MasterCourseConverterImpl} from "../../../adapter/impl/MasterCourseConverterImpl";
import {MasterSyllabusConverter} from "../../../adapter/interfaces/MasterSyllabusConverter";
import {MasterSyllabusConverterImpl} from "../../../adapter/impl/MasterSyllabusConverterImpl";
import {inject} from "@angular/core/testing";
import {Subject} from 'rxjs/Rx';
declare var $: any;
import {DataTableDirective} from 'angular-datatables';

import {MasterCourseService} from "../../../service/master-course.service";
import {MasterSyllabusService} from "../../../service/master-syllabus.service";
import {MasterSubjectService} from "../../../service/master-subject.service";
import {ChapterTO} from "../../../to/ChapterTO";
import {SyllabusIdNameTO} from "../../../to/SyllabusIdNameTO";
import {FormBuilder, FormControl, FormGroup, FormArray} from "@angular/forms";
import {AppConstants} from "../../../constants/AppConstants";





@Component({
  selector: 'app-syllbus-popup',
  templateUrl: './syllbus-popup.component.html',
  styleUrls: ['./syllbus-popup.component.css'],
  providers: [MasterCourseService, MasterSyllabusService, MasterSubjectService, {
    provide: 'MasterCourseConverter',
    useClass: MasterCourseConverterImpl
  }, {
    provide: 'MasterSyllabusConverter', useClass: MasterSyllabusConverterImpl
  }]
})
export class SyllbusPopupComponent implements OnInit {

  courseFormGroup: FormGroup;
  errorMessage: string;
  sucessMessage: string;
  masterCourseTOList: FirebaseListObservable<MasterCourseTO>;
  fb: FormBuilder;
  SyllabusIdNameTO: FirebaseListObservable<MasterCourseTO>;
  masterSyllabusTO: MasterSyllabusTO;
  div_Element_Id: string = '0';//for multiple pages in school list page;; 0 to show list of school , 1 to show add school, 2 to show edit school, 3 to show single school view.
  selectedCourseArray: Array<any> = [];
  selectedSyllabusArray: Array<any> = []; //FirebaseListObservable<MasterSyllabusTO>;
  selectedSyllabusnameArray: Array<any> = []; //FirebaseListObservable<MasterSyllabusTO>;
  selectedSyllabusupArray: Array<any> = []; //FirebaseListObservable<MasterSyllabusTO>;
  selectedSyllabusupnameArray: Array<any> = []; //FirebaseListObservable<MasterSyllabusTO>;
  masterCourseTO: MasterCourseTO;
  masterSyllabusTOList: FirebaseListObservable<MasterSyllabusTO>;
  active: string = "0";// for error and success divs;;  0 for no content, 1 for success, 2 for error
  subjectindexcount: number = 0;
 updateCourse: BehaviorSubject<string> = new BehaviorSubject<string>(""); // Holds the error message
  popupstatus: string = "0"; //0 for default close //1 for close and show listing
  showupload: string = "0"; //0 for default close //1 for close and show listing
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  flag: boolean = false;
  showClassSelection:boolean = false;
  add_condition:string;
  update$: Observable<string> = this.updateCourse.asObservable(); // observer for the above message
  chaptersList: FirebaseListObservable<ChapterTO>;
  @Output() notify: EventEmitter<string> = new EventEmitter<string>();

  constructor(@Inject('MasterCourseConverter') private masterCourseConverter: MasterCourseConverter, @Inject('MasterSyllabusConverter') private masterSyllabusConverter: MasterSyllabusConverter, fb: FormBuilder, private router: Router) {
    this.masterCourseConverter.getAllMasterCourse(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID), this);
    this.masterSyllabusConverter.getAllMasterSyllabus(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID), this);

    // if (localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID) == null) {
    //   this.router.navigate(['/']);
    // }
    this.fb = fb;

  }

  ngOnInit() {

    this.courseFormGroup = this.fb.group({
      courseName: [''], syllabusList: this.fb.array([this.initsyllabusNames()]), courseId: ['']
    });

  }
  ngOnChanges() {

    // console.log('click');
     this.rerender();
 
   }

  initsyllabusNames() {
    return this.fb.group({
      // list all your form controls here, which belongs to your form array
      syllabusName: [''],
        syllabusId: [''],
      //   uniqueId: ['']
    });
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }


  displayMasterCourseCallBack(masterCourseTO: MasterCourseTO) {

    console.log("displayMasterCourseCallBack ==> " + masterCourseTO.courseName + " " + masterCourseTO.courseId );
    this.masterCourseTO = masterCourseTO;

    this.courseFormGroup.controls['courseName'].patchValue(masterCourseTO.courseName);
    this.courseFormGroup.controls['courseId'].patchValue(masterCourseTO.courseId);
    //this.courseFormGroup.controls['uniqueId'].patchValue(masterCourseTO.uniqueId);
    this.courseFormGroup.controls['syllabusList'].patchValue(masterCourseTO.syllabusList);
    
if(masterCourseTO.syllabusList != null){
  console.log("displayMasterCourseCallBack ==> " + masterCourseTO.courseName + " " + masterCourseTO.courseId + " " + masterCourseTO.syllabusList);
  
    for (var iIndex = 0; iIndex < masterCourseTO.syllabusList.length; iIndex++) {
      console.log("syllabus ==> " + masterCourseTO.syllabusList[iIndex].syllabusName);
      console.log("syllabus  syllabus id ==> " + masterCourseTO.syllabusList[iIndex].syllabusId);

      this.selectedSyllabusArray.push(masterCourseTO.syllabusList[iIndex].syllabusId);
      this.selectedSyllabusnameArray.push(masterCourseTO.syllabusList[iIndex].syllabusName);
    }
    }

  }

  displayAllMasterCourseCallBack(masterCourseTOList: FirebaseListObservable<MasterCourseTO>) {

    console.log("displayAllMasterCourseCallBack ==> " + masterCourseTOList);
    this.masterCourseTOList = masterCourseTOList;

    /*masterCourseTOList.forEach(obj => {
     console.log(obj.courseId + ' ' + obj.courseName );
     for (var iIndex=0; iIndex < obj.syllabusList.length; iIndex++){
     console.log("syllabus ==> "+ obj.syllabusList[iIndex].syllabusName );
     }

     }
     );*/
    // this.rerender();
  }

  displayAllMasterSyllabusCallBack(masterSyllabusTOList: FirebaseListObservable<MasterSyllabusTO>) {
    console.log("displayAllMasterSyllabusCallBack ==> " + masterSyllabusTOList);
    this.masterSyllabusTOList = masterSyllabusTOList;
    masterSyllabusTOList.forEach(obj => {
      console.log(obj.syllabusName + ' ' + obj.syllabusId);
      // this.masterSyllabusTO=obj;
    });
    this.rerender();
  }

  displayMasterSyllabusCallBack(masterSyllabusTO: MasterSyllabusTO) {

    console.log("displayMasterSyllabusCallBack ###==> " + masterSyllabusTO.syllabusName + masterSyllabusTO.subjectName);

    this.masterSyllabusTO = masterSyllabusTO;   
  }
  displayAllSyllabusCallBack(syllabusIdNameTOList:FirebaseListObservable<SyllabusIdNameTO>){

    syllabusIdNameTOList.forEach(obj => {
      console.log(obj.syllabusName + ' ' + obj.syllabusId);
      // this.masterSyllabusTO=obj;

    });

  }
  displayAllChaptersCallBack(chapters: FirebaseListObservable<ChapterTO>) {
    console.log("displayAllChaptersCallBack ==> " + chapters);
    this.chaptersList = chapters;
    chapters.forEach(obj => {
      console.log(obj.chapterId + ' ' + obj.chapterName + ' ' + obj.serialNo + '' + obj.completion);
    });
  }
  successMessageCallBack(messageTO: MessageTO) {
    console.log("successMessageCallBack ==>" + messageTO.messageInfo + "  " + messageTO.messageType + "  " + messageTO.serviceClassName + "  " + messageTO.serviceMethodName);
    if (messageTO.serviceMethodName == "searchAndAddMasterCourse()") {
     
    }
    if (messageTO.serviceMethodName == "updateMasterCourse()") {
      this.popupstatus = "1";
  
    }
    this.sucessMessage = messageTO.messageInfo;
    if (messageTO.messageInfo.length != 0) {
      this.active = "1";
    } else {
      this.active = "0";
    }
  }

  
closePopup()
{
  console.log(this.selectedSyllabusnameArray);
  var returnstring="";
  for(var loopvar=0;loopvar<this.selectedSyllabusnameArray.length;loopvar++)
  {
    returnstring=returnstring+"&*&"+this.selectedSyllabusnameArray[loopvar];
  }
  var returnstring1="";
  for(var loopvar=0;loopvar<this.selectedSyllabusArray.length;loopvar++)
  {
    returnstring1=returnstring1+"&*&"+this.selectedSyllabusArray[loopvar];
  }
  
  this.notify.emit(returnstring+"*&*"+returnstring1);
  this.selectedSyllabusArray= ['']
  this.selectedSyllabusnameArray= ['']

}

  showsyllabusPopup()
  {
    // this.getAllClassesProfile(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID))
    this.showClassSelection=true;

  }
  onNotify(status:string):void {
    //alert(status);
    this.showClassSelection=false;
    

  }

  /**
   * Handle all the error messages here . Basing on the error message decide where you want to display
   * the Error Message, Also if required you can recirect to any page basing on the navigate method
   * given below.
   *
   * @param message
   */
  errorMessageCallBack(messageTO: MessageTO) {
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
    this.updateCourse.next(message);
  }

 


  checkedMastersyllabus(value,val) {
    console.log(value, val);
    if ((<HTMLInputElement>document.getElementById(value)).checked === true) {
      // var add_condition = value;
      // var add_co = val;  
      this.selectedSyllabusArray.push(value);
      this.selectedSyllabusnameArray.push(val);
    } else if ((<HTMLInputElement>document.getElementById(value)).checked === false) {
      let indexx = this.selectedSyllabusArray.indexOf(value);
      this.selectedSyllabusArray.splice(indexx, 1)
      this.selectedSyllabusnameArray.splice(indexx, 1)
    }
    //var getval = Object.assign({ add_condition ,add_co });
    //var copy = getval;
    
   // console.log(copy);
    console.log(this.selectedSyllabusArray);
    console.log(this.selectedSyllabusnameArray);
    console.log((<HTMLInputElement>document.getElementById(value)).checked);
  }

  


  deleteCourse() {
    for (var loopvar = 0; loopvar < this.selectedCourseArray.length; loopvar++) {
      console.log(this.selectedCourseArray[loopvar]);
      this.masterCourseConverter.deleteMasterCourse(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID), this.selectedCourseArray[loopvar], this);
      
    }
    this.selectedCourseArray = [];
    // this.showCourseList();

  }

  rerender(): void {
    console.log("render call " + this.flag + "   " + this.dtElement);

    if (!this.flag && this.dtElement != null) {
      this.flag = true;
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        console.log("shiva 111" + dtInstance);
        // Destroy the table first
        dtInstance.destroy();
        // Call the dtTrigger to rerender again
        console.log("shiva 222 " + this.dtTrigger);
        if (this.dtTrigger != null) this.dtTrigger.next(); else
          console.log("error as null");
        this.flag = false;
      });
    }

  }


}
