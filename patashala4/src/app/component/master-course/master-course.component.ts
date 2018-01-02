import {Component, OnInit, Inject} from '@angular/core';
import {ViewChild} from '@angular/core';
import {MasterCourseComponentInterface} from "./MasterCourseComponentInterface";
import {MasterSyllabusComponentInterface} from "./../master-syllabus/MasterSyllabusComponentInterface";
import {MasterCourseTO} from "./../../to/MasterCourseTO";
import {MasterCourseVO} from "./../../vo/MasterCourseVO";
import {MasterSyllabusTO} from "./../../to/MasterSyllabusTO";
import {MasterSyllabusVO} from "./../../vo/MasterSyllabusVO";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {MessageTO} from "./../../to/MessageTO";
import {Router} from "@angular/router";
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database-deprecated';
declare var $: any;
import {MasterCourseConverter} from "../../adapter/interfaces/MasterCourseConverter";
import {MasterCourseConverterImpl} from "../../adapter/impl/MasterCourseConverterImpl";
import {MasterSyllabusConverter} from "../../adapter/interfaces/MasterSyllabusConverter";
import {MasterSyllabusConverterImpl} from "../../adapter/impl/MasterSyllabusConverterImpl";
import {inject} from "@angular/core/testing";
import {Subject} from 'rxjs/Rx';
declare var $: any;
import {DataTableDirective} from 'angular-datatables';

import {MasterCourseService} from "../../service/master-course.service";
import {MasterSyllabusService} from "../../service/master-syllabus.service";
import {MasterSubjectService} from "../../service/master-subject.service";
import {ChapterTO} from "../../to/ChapterTO";
import {SyllabusIdNameTO} from "../../to/SyllabusIdNameTO";
import {FormBuilder, FormControl, FormGroup, FormArray} from "@angular/forms";
import {AppConstants} from "../../constants/AppConstants";
// import { lookup } from 'dns';

@Component({
  selector: 'app-master-course',
  templateUrl: './master-course.component.html',
  styleUrls: ['./master-course.component.css'],
  providers: [MasterCourseService, MasterSyllabusService, MasterSubjectService, {
    provide: 'MasterCourseConverter',
    useClass: MasterCourseConverterImpl
  }, {
    provide: 'MasterSyllabusConverter', useClass: MasterSyllabusConverterImpl
  }]
})
export class MasterCourseComponent implements OnInit, MasterCourseComponentInterface {

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
  masterCourseTO: MasterCourseTO;
  masterSyllabusTOList: FirebaseListObservable<MasterSyllabusTO>;
  active: string = "0";// for error and success divs;;  0 for no content, 1 for success, 2 for error
  subjectindexcount: number = 0;
//  updateSubject: BehaviorSubject<string> = new BehaviorSubject<string>(""); // Holds the error message
  popupstatus: string = "0"; //0 for default close //1 for close and show listing
  showupload: string = "0"; //0 for default close //1 for close and show listing
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  flag: boolean = false;
  //update$: Observable<string> = this.updateCourse.asObservable(); // observer for the above message
  chaptersList: FirebaseListObservable<ChapterTO>;


  constructor(@Inject('MasterCourseConverter') private masterCourseConverter: MasterCourseConverter, @Inject('MasterSyllabusConverter') private masterSyllabusConverter: MasterSyllabusConverter, fb: FormBuilder, private router: Router) {
    this.masterCourseConverter.getAllMasterCourse(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID), this);
    this.masterSyllabusConverter.getAllMasterSyllabus(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID), this);

    if (localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID) == null) {
      this.router.navigate(['/']);
    }
    this.fb = fb;

  }

  ngOnInit() {

    this.courseFormGroup = this.fb.group({
      courseName: [''], syllabusList: this.fb.array([this.initsyllabusNames()]), courseId: ['']
    });

  }

  initsyllabusNames() {
    return this.fb.group({
      // list all your form controls here, which belongs to your form array
      syllabusName: [''], syllabusId: [''], uniqueId: ['']
    });
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }


  displayMasterCourseCallBack(masterCourseTO: MasterCourseTO) {

    console.log("displayMasterCourseCallBack ==> " + masterCourseTO.courseName + " " + masterCourseTO.courseId);
    this.masterCourseTO = masterCourseTO;
    this.courseFormGroup.controls['courseName'].patchValue(masterCourseTO.courseName);
    this.courseFormGroup.controls['courseId'].patchValue(masterCourseTO.courseId);
    //this.courseFormGroup.controls['uniqueId'].patchValue(masterCourseTO.uniqueId);
    this.courseFormGroup.controls['syllabusList'].patchValue(masterCourseTO.syllabusList);


    for (var iIndex = 0; iIndex < masterCourseTO.syllabusList.length; iIndex++) {
      console.log("syllabus ==> " + masterCourseTO.syllabusList[iIndex].syllabusName);
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
    this.rerender();


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


    // this.syllabusFormGroup.controls['syllabusName'].patchValue(masterSyllabusTO.syllabusName);
    // this.syllabusFormGroup.controls['subjectName'].patchValue(masterSyllabusTO.subjectName);
    // this.syllabusFormGroup.controls['subjectId'].patchValue(masterSyllabusTO.subjectId);

  }

  displayAllChaptersCallBack(chapters: FirebaseListObservable<ChapterTO>) {

    console.log("displayAllChaptersCallBack ==> " + chapters);
    this.chaptersList = chapters;
    // this.syllabusFormGroup.controls['chapterList'].patchValue(chapters);

    chapters.forEach(obj => {
      console.log(obj.chapterId + ' ' + obj.chapterName + ' ' + obj.serialNo + '' + obj.completion);
      // this.chaptersList=obj;
    });
  }


  successMessageCallBack(messageTO: MessageTO) {
    console.log("successMessageCallBack ==>" + messageTO.messageInfo + "  " + messageTO.messageType + "  " + messageTO.serviceClassName + "  " + messageTO.serviceMethodName);
    if (messageTO.serviceMethodName == "searchAndAddMasterCourse()") {
      this.showCourseList();
    }
    if (messageTO.serviceMethodName == "updateMasterCourse()") {
      this.popupstatus = "1";
      this.showCourseList();
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
    if (this.popupstatus == "1") this.showCourseList();
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
    //this.updateCourse.next(message);
  }

  testAdd() {

    var masterCourseTO = new MasterCourseTO();
    //masterSubjectVO.uniqueId = "";

    masterCourseTO.courseName = "MPC 2nd Year";

    var syllabusList = new Array<SyllabusIdNameTO>();
    var syllabus1 = new SyllabusIdNameTO();

    syllabus1.syllabusName = "Science 2nd Year"
    syllabus1.syllabusId = syllabus1.syllabusName.toLowerCase()

    syllabusList[0] = syllabus1

    var syllabus2 = new SyllabusIdNameTO();
    syllabus2.syllabusName = "Maths 2nd Year"
    syllabus2.syllabusId = syllabus2.syllabusName.toLowerCase()

    syllabusList[1] = syllabus2

    masterCourseTO.syllabusList = syllabusList


    this.masterCourseConverter.addMasterCourse(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID), masterCourseTO, this);

  }

  testUpdate() {

    var masterCourseTO = new MasterCourseTO();
    //masterSubjectVO.uniqueId = "";

    //masterCourseTO.courseId = '-L055eRXjeZ09DvqdyXe';
    masterCourseTO.courseName = "Inter 2nd Years";

    var syllabusList = new Array<SyllabusIdNameTO>();
    var syllabus1 = new SyllabusIdNameTO();

    syllabus1.syllabusName = "Science 2nd Year"
    syllabus1.syllabusId = syllabus1.syllabusName.toLowerCase()

    syllabusList[0] = syllabus1

    var syllabus2 = new SyllabusIdNameTO();
    syllabus2.syllabusName = "Maths 2nd Year"
    syllabus2.syllabusId = syllabus2.syllabusName.toLowerCase()

    syllabusList[1] = syllabus2

    masterCourseTO.syllabusList = syllabusList


    this.masterCourseConverter.updateMasterCourse(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID), "-L055eRXjeZ09DvqdyXe", masterCourseTO, this);

  }

  testGet() {

    this.masterCourseConverter.getMasterCourse(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID), "-L1q_0MTSFNkDRIpmo5h", this);

  }

  testGetAll() {

    this.masterCourseConverter.getAllMasterCourse(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID), this);

  }

  testDelete() {

    this.masterCourseConverter.deleteMasterCourse(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID), "-L-r3O1-fM__L_tldUGE", this);

  }

  show_addCourseFields() {
    this.div_Element_Id = "1";
    this.courseFormGroup.controls['courseName'].patchValue('');
    // this.courseFormGroup.controls['syllabusList'].patchValue('');//this.initsyllabusNames());
    this.courseFormGroup.controls['courseId'].patchValue(this.subjectindexcount + 1);
    // this.courseFormGroup.controls['uniqueId'].patchValue('');
    this.clearSyllabusList();
    // this.clearSyllabusName();
    // this.addSyllabusName();
    console.log(this.div_Element_Id);

  }


  // public selectedsyllabus: string;

  // oncourseChange(val){
  //   this.selectedsyllabus= val;
  // }


  addCourseSubmit({value, valid}) {
    var syllabusList = new Array<SyllabusIdNameTO>();
    var masterCourseTO = new MasterCourseTO();
    masterCourseTO.courseId = value.courseId;
    masterCourseTO.courseName = value.courseName;
    //    for(var loopvar=0; loopvar<this.selectedSyllabusArray.length; loopvar++){

    //      masterCourseTO.syllabusList[loopvar]=this.selectedSyllabusArray[loopvar];

    //    }

    masterCourseTO.syllabusList = this.selectedSyllabusArray;


    //  console.log(masterCourseTO.syllabusList);
    console.log("add course values" + this.selectedSyllabusArray.length);
    //  // selectedSyllabusArray
    this.masterCourseConverter.addMasterCourse(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID), masterCourseTO, this);

  }

  getselectedCourseProfile() {
    this.div_Element_Id = "2";
    this.addSyllabusName();
    this.masterCourseConverter.getMasterCourse(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID), this.selectedCourseArray[0], this);
    console.log(this.div_Element_Id);
  }

  showCourseList() {
    if (this.selectedCourseArray.length > 0) (<HTMLInputElement>document.getElementById(this.selectedCourseArray[0])).checked = false;
    this.errorMessage = "";
    this.active = "0";
    this.selectedCourseArray = [];
    this.div_Element_Id = '0';
    this.masterCourseConverter.getAllMasterCourse(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID), this);
  }

  checkedmasterCourse(value) {
    if ((<HTMLInputElement>document.getElementById(value)).checked === true) {
      this.selectedCourseArray.push(value);
    } else if ((<HTMLInputElement>document.getElementById(value)).checked === false) {
      let indexx = this.selectedCourseArray.indexOf(value);
      this.selectedCourseArray.splice(indexx, 1)
    }
    console.log(this.selectedCourseArray)
  }

  checkedMastersyllabus(value) {
    console.log(value);
    if ((<HTMLInputElement>document.getElementById(value)).checked === true) {
      this.selectedSyllabusArray.push(value);
    } else if ((<HTMLInputElement>document.getElementById(value)).checked === false) {
      let indexx = this.selectedSyllabusArray.indexOf(value);
      this.selectedSyllabusArray.splice(indexx, 1)
    }
    console.log(this.selectedSyllabusArray);

  }


  // updateCourse({value, valid}: { value: MasterCourseTO, valid: boolean }){
  //   //  var field_name = "";
  //   //   this.errorMessage = field_name;
  //   //  // this.active = "0";
  //   //   if (value.courseName == null || value.courseName == ""){
  //   //     field_name = field_name + " course Name, ";
  //   //   }

  //   //   //alert(value);
  //   // }


  deleteSyllabusList(i: number) {
    // control refers to your formarray
    const control = <FormArray>this.courseFormGroup.controls['syllabusList'];
    // remove the chosen row
    control.removeAt(i);
  }

  addSyllabusName() {
    // control refers to your formarray
    const control = <FormArray>this.courseFormGroup.controls['syllabusList'];
    // add new formgroup
    control.push(this.initsyllabusNames());
  }

  clearSyllabusList() {
    const control = <FormArray>this.courseFormGroup.controls['syllabusList'];
    for (var loop = 0; loop < control.length; loop++)
      control.removeAt(loop);
  }


  deleteCourse() {
    for (var loopvar = 0; loopvar < this.selectedCourseArray.length; loopvar++) {
      console.log(this.selectedCourseArray[loopvar]);
      this.masterCourseConverter.deleteMasterCourse(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID), this.selectedCourseArray[loopvar], this);
      // this.masterCourseConverter.deleteMasterCourse(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID), "-L-r3O1-fM__L_tldUGE", this);

    }
    this.selectedCourseArray = [];
    this.showCourseList();

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


  viewSingleCourseProfile() {
    this.div_Element_Id = "3";
    this.masterCourseConverter.getMasterCourse(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID), this.selectedCourseArray[0], this);
  }


}
