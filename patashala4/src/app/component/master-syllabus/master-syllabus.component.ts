import {Component, OnInit, Inject} from '@angular/core';
import {ViewChild} from '@angular/core';
import {MasterSyllabusComponentInterface} from "./MasterSyllabusComponentInterface";
import {MasterSubjectComponentInterface} from "./../mastersubject/MasterSubjectComponentInterface";
import {MasterSyllabusTO} from "./../../to/MasterSyllabusTO";
import {MasterSyllabusVO} from "./../../vo/MasterSyllabusVO";
import {MasterSubjectTO} from "./../../to/MasterSubjectTO";
import {MasterSubjectVO} from "./../../vo/MasterSubjectVO";
import {MessageTO} from "./../../to/MessageTO";
import {Router} from "@angular/router";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database-deprecated';

import {MasterSyllabusConverter} from "../../adapter/interfaces/MasterSyllabusConverter";
import {MasterSyllabusConverterImpl} from "../../adapter/impl/MasterSyllabusConverterImpl";
import {MasterSubjectConverter} from "../../adapter/interfaces/MasterSubjectConverter";
import {MasterSubjectConverterImpl} from "../../adapter/impl/MasterSubjectConverterImpl";
import {inject} from "@angular/core/testing";
declare var $: any;
import {Subject} from 'rxjs/Rx';
import {DataTableDirective} from 'angular-datatables';

import {MasterSyllabusService} from "../../service/master-syllabus.service";
import {ChapterTO} from "../../to/ChapterTO";
import {SyllabusIdNameTO} from "../../to/SyllabusIdNameTO";
import {FormBuilder, FormControl, FormGroup, FormArray} from "@angular/forms";
import {MasterSubjectService} from "../../service/master-subject.service";
import {AppConstants} from '../../constants/AppConstants';


@Component({
  selector: 'app-master-syllabus',
  templateUrl: './master-syllabus.component.html',
  styleUrls: ['./master-syllabus.component.css'],
  providers: [MasterSyllabusService, MasterSubjectService, {
    provide: 'MasterSyllabusConverter',
    useClass: MasterSyllabusConverterImpl
  }, {provide: 'MasterSubjectConverter', useClass: MasterSubjectConverterImpl}]
})
export class MasterSyllabusComponent implements OnInit, MasterSyllabusComponentInterface {


  syllabusFormGroup: FormGroup;
  errorMessage: string;
  sucessMessage: string;
  masterSyllabusTOList: FirebaseListObservable<MasterSyllabusTO>;
  fb: FormBuilder;
  masterSyllabusTO:MasterSyllabusTO;
  masterSubjectTO:MasterSubjectTO;
  alldata = ["Mathsmatics", "Physics", "network&theory"]
  div_Element_Id: string = '0';//for multiple pages in school list page;; 0 to show list of school , 1 to show add school, 2 to show edit school, 3 to show single school view.
  selectedSyllabusArray: Array<any> = [];
  masterSubjectTOList: FirebaseListObservable<MasterSubjectTO>;
  popupstatus: string = "0"; //0 for default close //1 for close and show listing
  showupload: string = "0"; //0 for default close //1 for close and show listing
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  flag: boolean = false;
  active: string = "0";// for error and success divs;;  0 for no content, 1 for success, 2 for error
  subjectindexcount: number = 0;
  updateSyllabus: BehaviorSubject<string> = new BehaviorSubject<string>(""); // Holds the error message
  update$: Observable<string> = this.updateSyllabus.asObservable(); // observer for the above message

  chaptersList:FirebaseListObservable<ChapterTO>;

  constructor(@Inject('MasterSyllabusConverter') private masterSyllabusConverter: MasterSyllabusConverter, @Inject('MasterSubjectConverter') private masterSubjectConverter: MasterSubjectConverter, fb: FormBuilder,private router: Router) {
    this.masterSyllabusConverter.getAllMasterSyllabus(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID), this);
    this.masterSubjectConverter.getAllMasterSubject(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID), this);
    
    if(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID)== null){
      this.router.navigate(['/']);
    };
    this.fb = fb;
  }

  ngOnInit() {
    this.syllabusFormGroup = this.fb.group({
      subjectName: [''],
      subjectId: [''],
      syllabusName: [''],
      syllabusId: [''],
      uniqueId: [''],
      chapterList: this.fb.array([this.initsyllabusNames()]),
    });
    // this.onsubjectChange();
  }

  initsyllabusNames() {
    return this.fb.group({
      chapterName: [''],
      chapterId: [''], // chapterName :[''],
      serialNo: [''],
      completion: [''], uniqueId: ['']
    });
  }
  addsyllabusNames(chaptername,chapterid,serialno,completion,uniqueid) {
    return this.fb.group({
      chapterName: [chaptername],
       chapterId: [chapterid], // chapterName :[''],
      serialNo: [serialno],
       completion: [completion], uniqueId: [uniqueid]
    });
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }




  displayMasterSyllabusCallBack(masterSyllabusTO: MasterSyllabusTO) {

    console.log("displayMasterSyllabusCallBack ###==> " + masterSyllabusTO.syllabusName + masterSyllabusTO.subjectName);

   this.masterSyllabusTO=masterSyllabusTO;

    this.syllabusFormGroup.controls['syllabusName'].patchValue(masterSyllabusTO.syllabusName);
    this.syllabusFormGroup.controls['subjectName'].patchValue(masterSyllabusTO.subjectName);
    this.syllabusFormGroup.controls['subjectId'].patchValue(masterSyllabusTO.subjectId);
    this.selectedsubject = masterSyllabusTO.subjectName;
  }

  displayMasterSubjectCallBack(masterSubjectTO: MasterSubjectTO) {

    console.log("displayMasterSubjectCallBack ==> " + masterSubjectTO.subjectName);
     this.masterSubjectTO= masterSubjectTO;
   
    
  }

  displayAllMasterSyllabusCallBack(masterSyllabusTOList: FirebaseListObservable<MasterSyllabusTO>) {

    console.log("displayAllMasterSyllabusCallBack ==> " + masterSyllabusTOList);

    this.masterSyllabusTOList = masterSyllabusTOList;

    masterSyllabusTOList.forEach(obj => {
      console.log(obj.syllabusName + ' ' + obj.subjectId);
      this.masterSyllabusTO=obj;
      
    });
    this.rerender();
  }

  displayAllChaptersCallBack(chapters: FirebaseListObservable<ChapterTO>) {
    this.clearchapterlist();
    console.log("displayAllChaptersCallBack ==> " + chapters);
    this.chaptersList= chapters;
    chapters.forEach(obj => {
      console.log(obj.chapterId + ' ' + obj.chapterName + ' ' + obj.serialNo +''+obj.completion);
      this.addchapterlist();  
    });
   this.syllabusFormGroup.controls['chapterList'].patchValue(this.chaptersList);
   
   console.log(this.chaptersList);
  }
  

  displayAllMasterSubjectCallBack(masterSubjectTOList: FirebaseListObservable<MasterSubjectTO>) {

    console.log("displayAllMasterSubjectCallBack ==> " + masterSubjectTOList);
    this.masterSubjectTOList=masterSubjectTOList;
    
    masterSubjectTOList.forEach(obj => {
      console.log(obj.subjectName + ' ' + obj.subjectId);

    });
    this.rerender();
    
  }

  successMessageCallBack(messageTO: MessageTO) {
    console.log("successMessageCallBack ==>" + messageTO.messageInfo + "  " + messageTO.messageType + "  " + messageTO.serviceClassName + "  " + messageTO.serviceMethodName);
    if (messageTO.serviceMethodName == "searchAndAddMasterSyllabus()") {
      this.showSyllabusList();
    }
    if (messageTO.serviceMethodName == "updateMasterSyllabus()") {
      this.popupstatus = "1";
      this.showSyllabusList();
    }
    this.sucessMessage = messageTO.messageInfo;
    if (messageTO.messageInfo.length != 0) {
      this.active = "1";
    } else {
      this.active = "0";
    }
  }

  closePopup() {
    this.sucessMessage = "";
    this.active = "0";
    if (this.popupstatus == "1") this.showSyllabusList();
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
    this.updateSyllabus.next(message);
  }






  testAdd() {

    var masterSyllabusTO = new MasterSyllabusTO();
    //masterSubjectVO.uniqueId = "";

    masterSyllabusTO.syllabusName = "Test Inter BPC 1st Year Science";
    masterSyllabusTO.subjectName = "Hindi";
    masterSyllabusTO.subjectId = "hindi";


    var chapterList = new Array<ChapterTO>();

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

    this.masterSyllabusConverter.addMasterSyllabus("-KwebjvSellhXyBRZbjo", masterSyllabusTO, chapterList, this);

  }

  testUpdate() {

    var masterSyllabusTO = new MasterSyllabusTO();
    //masterSubjectVO.uniqueId = "";
    masterSyllabusTO.syllabusId = "-L-r2Q71r2nlFibQXzpc"
    masterSyllabusTO.syllabusName = "Inter MPC 2ND Year Science";
    masterSyllabusTO.subjectName = "MATHS";
    masterSyllabusTO.subjectId = "maths";

    var chapterList = new Array<ChapterTO>();

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

    var chapter3 = new ChapterTO();
    chapter3.chapterName = "Chapter 31";
    chapter3.serialNo = "3";
    chapter3.completion = "0";
    chapterList[2] = chapter3;

    this.masterSyllabusConverter.updateMasterSyllabus("-KwebjvSellhXyBRZbjo", "-L1I4OvjAYod8v03cMvb", masterSyllabusTO, chapterList, this);

  }

  testGet() {

    this.masterSyllabusConverter.getMasterSyllabus("-KwebjvSellhXyBRZbjo", "-L1I4OvjAYod8v03cMvb", this);
    this.masterSyllabusConverter.getChapters("-KwebjvSellhXyBRZbjo", "-L1I4OvjAYod8v03cMvb", this);


  }

  testGetAll() {

    this.masterSyllabusConverter.getAllMasterSyllabus("-KwebjvSellhXyBRZbjo", this);

  }

  testDelete() {

    this.masterSyllabusConverter.deleteMasterSyllabus("-KwebjvSellhXyBRZbjo", "-L-r3O1-fM__L_tldUGE", this);

  }

  show_addSyllabusFields() {
    this.div_Element_Id = "1";
    this.syllabusFormGroup.controls['syllabusName'].patchValue('');
    this.syllabusFormGroup.controls['subjectName'].patchValue('');
    this.syllabusFormGroup.controls['subjectId'].patchValue('');
    this.syllabusFormGroup.controls['uniqueId'].patchValue('');
    this.clearchapterlist();
     this.addchapterlist(); 
    console.log(this.chaptersList);
      
  }

  public selectedsubject: string;

  onsubjectChange(val) {  
    console.log("  call onsubjectChange "+val) 
    this.selectedsubject = val;
  }


  addSyllabusSubmit({value, valid}) {
    this.active = "0";
    var chapterList = new Array<ChapterTO>();
    var masterSyllabusTO = new MasterSyllabusTO();
    for (var loopvar = 0; loopvar < value.chapterList.length; loopvar++) {
      if(value.chapterList[loopvar].chapterName!= '')
      {
      var chapter2 = new ChapterTO();
      chapter2.chapterName = value.chapterList[loopvar].chapterName;
      // chapter2.completion = value.chapterList[loopvar].completion;
      chapter2.serialNo = (loopvar+1)+'';
      chapter2.chapterId =  chapter2.chapterName.toLowerCase();//loopvar+ ""//
      // chapter2.uniqueId = chapter2.uniqueId.toLowerCase();//loopvar+""//
      chapterList.push(chapter2)
    }
  }
    if(value.syllabusName == null || value.syllabusName == ''){
      this.errorMessage = "please enter syllabus name";
      this.active= "2";
   }
   else if(this.selectedsubject == null || this.selectedsubject == ""){
          this.errorMessage="please select one subject name";
          this.active="2";
        }
        
   else if(chapterList == null || chapterList.length == 0){
          this.errorMessage="please enter chapter details";
          this.active="2";
        }
      else{
      masterSyllabusTO.syllabusId = value.syllabusId;
      masterSyllabusTO.syllabusName = value.syllabusName;
      masterSyllabusTO.subjectName = this.selectedsubject;
      this.masterSyllabusConverter.addMasterSyllabus(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID), masterSyllabusTO, chapterList, this);
    }
      console.log(masterSyllabusTO);
      console.log(chapterList.length);
  
  }


  getselectedSyllabusProfile() {
    // this.syllabusFormGroup.controls['subjectName'].patchValue('');
    this.div_Element_Id = "2";
  	this.masterSyllabusConverter.getMasterSyllabus(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID), this.selectedSyllabusArray[0], this);
    this.masterSyllabusConverter.getChapters(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID), this.selectedSyllabusArray[0], this);

     console.log( this.selectedSyllabusArray[0]);
     //this.selectedsubject = "";
  }

  checkedmasterSyllabus(value) {
    if ((<HTMLInputElement>document.getElementById(value)).checked === true) {
      this.selectedSyllabusArray.push(value);
    } 
    else if ((<HTMLInputElement>document.getElementById(value)).checked === false) {
      let indexx = this.selectedSyllabusArray.indexOf(value);
      this.selectedSyllabusArray.splice(indexx, 1)
    }
    console.log(this.selectedSyllabusArray)
  }

  deleteCourse() {
    for (var loopvar = 0; loopvar < this.selectedSyllabusArray.length; loopvar++) {
      console.log(this.selectedSyllabusArray[loopvar]);
      this.masterSyllabusConverter.deleteMasterSyllabus(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID), this.selectedSyllabusArray[loopvar], this);
    }
    this.selectedSyllabusArray = [];
    this.showSyllabusList();

  }

  showSyllabusList() {
    if (this.selectedSyllabusArray.length > 0) (<HTMLInputElement>document.getElementById(this.selectedSyllabusArray[0])).checked = false;      
    this.selectedSyllabusArray = [];
    this.div_Element_Id='0';
    this.active='0';
    this.errorMessage = "";
    this.clearchapterlist();
    //this.addchapterlist();
    this.masterSyllabusConverter.getAllMasterSyllabus(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID), this);
  }


  addchapterlist() {
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

  clearchapterlist() {
    const control = <FormArray>this.syllabusFormGroup.controls['chapterList'];
    for (var loop = 0; loop < control.length; loop++)
      this.deleteSyllabusName(loop);
  }





  UpdateSyllabusSubmit({value, valid}){
    this.active="0";
    var masterSyllabusTO = new MasterSyllabusTO();
    var chapterList = new Array<ChapterTO>();
    for (var loopvar = 0; loopvar < value.chapterList.length; loopvar++) {
      if(value.chapterList[loopvar].chapterName!= '')
      {
      var chapter2 = new ChapterTO();
      chapter2.chapterName = value.chapterList[loopvar].chapterName;
      // chapter2.completion = value.chapterList[loopvar].completion;
      chapter2.serialNo =  (loopvar+1)+""  //value.chapterList[loopvar].serialNo;
      chapter2.chapterId = loopvar + ""; //chapter2.chapterId.toLowerCase();
      chapter2.uniqueId = loopvar + "";//chapter2.uniqueId.toLowerCase();
      chapterList.push(chapter2)
    }
  }
     if(value.syllabusName == null || value.syllabusName == ''){
        this.errorMessage = "please enter syllabus name";
        this.active= "2";
     }
     else if(this.selectedsubject == null || this.selectedsubject == ""){
      this.errorMessage="please select one subject name";
      this.active="2";
    }
     else if(chapterList == null || chapterList.length == 0){
      this.errorMessage="please enter chapter details";
      this.active="2";
    }
else{
    masterSyllabusTO.syllabusId = value.syllabusId;
    masterSyllabusTO.syllabusName = value.syllabusName;
     masterSyllabusTO.subjectName =  this.selectedsubject;
    // masterSyllabusTO.subjectId = "subjectId";
    this.masterSyllabusConverter.updateMasterSyllabus(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID),this.selectedSyllabusArray[0], masterSyllabusTO, chapterList, this);
    }
    console.log("modify latest" +  masterSyllabusTO.subjectName );
  }
 
  viewSingleSyllabusProfile(){
    this.div_Element_Id="3";
    this.masterSyllabusConverter.getMasterSyllabus(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID), this.selectedSyllabusArray[0], this);
    this.masterSyllabusConverter.getChapters(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID), this.selectedSyllabusArray[0], this);
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
