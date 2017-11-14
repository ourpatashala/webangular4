import {Component, OnInit, Input, Output, Inject, PipeTransform, Pipe, Injector} from '@angular/core';
import {ViewChild} from '@angular/core';
import {StudentService} from "../../service/student.service";
import {StudentConverter} from "../../adapter/interfaces/StudentConverter";
import {StudentTO} from "../../to/StudentTO";
import {StudentConverterImpl} from "../../adapter/impl/StudentConverterImpl";
import {FormGroup, FormControl, Validators, FormBuilder, FormArray, AbstractControl} from "@angular/forms";
import {ArrayType} from "@angular/compiler/src/output/output_ast";
import {StudentComponentInterface} from "./StudentComponentInterface";
import {jsonpFactory} from "@angular/http/src/http_module";
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {AngularFireAuth} from "angularfire2/auth";
import {Messages} from "../../constants/Messages";
import {Router} from "@angular/router";
import {ErrorService} from "../../service/error.service";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
declare var $: any;
import {Subject} from 'rxjs/Rx';
import {DataTableDirective} from 'angular-datatables';
import {MessageTO} from "../../to/MessageTO";
import {ClassProfileVO} from "../../vo/ClassProfileVO";
import {ClassProfileTO} from "../../to/ClassProfileTO";
import {UploadFileService} from '../../service/upload-file.service';
import {FileUpload} from '../../service/fileupload';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { DatepickerOptions } from 'ng2-datepicker';
import { AppConstants } from "../../constants/AppConstants";



@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  providers: [StudentService, {provide: "StudentConverter", useClass: StudentConverterImpl}],
  styleUrls: ['./student.component.css']
})

export class StudentComponent implements OnInit, StudentComponentInterface {
  className: any;
  dateOptions: DatepickerOptions = {
    displayFormat: 'DD-MMM-YYYY',
    barTitleFormat: 'MMMM YYYY',
    minYear: 1970,
    maxYear: 2030,
    firstCalendarDay: 0 //; // 0 - Sunday, 1 - Monday
  };

  selectedFiles: FileList
  currentFileUpload: FileUpload
  progress: {percentage: number} = {percentage: 0};

  selectedStudentArray: Array<any> = [];
  errorMessage: string;
  sucessMessage: string;
  subscription: Subscription;
  message: string = '';
  studentProfileTOList: FirebaseListObservable<StudentTO>;
  classProfileTOList: FirebaseListObservable<ClassProfileTO>;
  studentTO: StudentTO;
  studentFormGroup: FormGroup;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  flag: boolean = false;
  showClassSelection:boolean = false;
  active: string = "0";// for error and success divs;;  0 for no content, 1 for success, 2 for error
  div_Element_Id: string = "0";//for multiple pages in school list page;;  0 to show list of school , 1 to show add school, 2 to show edit school, 3 to show single school view.
  fb: FormBuilder;
  @Input() inputArray: ArrayType[];
  updateSubject: BehaviorSubject<string> = new BehaviorSubject<string>(""); // Holds the error message
  popupstatus: string = "0"; //0 for default close //1 for close and show listing
  showupload: string = "0"; //0 for default close //1 for close and show listing

  update$: Observable<string> = this.updateSubject.asObservable(); // observer for the above message
  constructor(@Inject("StudentConverter") private studentConverter: StudentConverter, fb: FormBuilder, private injector: Injector, private router: Router, private errorService: ErrorService, private uploadService: UploadFileService) {
    this.fb = fb;
    this.subscription = this.update$.subscribe(message => {
      this.message = message;
    });

    this.studentTO = new StudentTO();
    var username = localStorage.getItem('userlogin');
    console.log("user logged in " + username);
    if (username == "" || username == "Undefined" || username == null) {
      this.router.navigate(['/']);
    }
    var selectedSchoolId = localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID);
    console.log("Selected School " + selectedSchoolId);
    if (selectedSchoolId == "" || selectedSchoolId == "Undefined" || selectedSchoolId == null) {
      this.router.navigate(['/School']);
    }
    this.getAllStudents(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID));
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }


  ngOnInit() {
    this.studentFormGroup = this.fb.group({
      firstName: [''],
      lastName: [''],
      middleName: [''], //mobileNumbers: [''],
      mobileNumbers: this.fb.array([this.initPhoneNumbers()]), // here
      gender: [''],
      landLine: [''],
      addressOne: [''],
      addressTwo: [''],
      city: [''],
      state: [''],
      country: [''],
      pincode: [''],
      bloodGroup: [''],
      dateOfBirth: new Date(),
      uploadPhoto: [''],
      fatherName: [''],
      motherName: [''],
      rollNo: [''],
      classId: [''],
      className: [''],
      schoolId: [localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID)],
      id: [''],
      siblings: this.fb.array([this.initSiblings()]) // here
      //TODO : Shiva integrate code by removing hardcoding of values.

    });


  }

  /**
   * Used for getting all school profile objects.
   */
  getAllStudents(schoolId: string) {
    this.studentConverter.getAllStudents(schoolId, this);

    //this.getAllClassesProfile(schoolId);
  }


  /**
   * Used for getting all classes profile objects of the school.
   */
  getAllClassesProfile(schoolId: string) {
    this.studentConverter.getAllClassesProfile(schoolId, this);
  }

  removeStudentProfilePic()
  {
    console.log(" Selected Student ID  "+localStorage.getItem(AppConstants.SHAREDPREFERANCE_STUDENTID));
    this.uploadService.removeStudentPic(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID), localStorage.getItem(AppConstants.SHAREDPREFERANCE_STUDENTID))


  }
  getStudentProfile(schoolId: string, studentId: string) {
    localStorage.setItem(AppConstants.SHAREDPREFERANCE_STUDENTID,studentId);
    //this.getPhoto(schoolId, studentId);
    this.studentConverter.getStudent(schoolId, studentId, this);
  }

  addStudentProfile({value, valid}: { value: StudentTO, valid: boolean }) {
    var field_name = "";
    this.errorMessage = field_name;
    this.active = "0";
    if (value.firstName == null || value.firstName == "") {
      field_name = field_name + "First Name, ";
    }
    if (value.lastName == null || value.lastName == "") {
      field_name = field_name + "Last Name, ";
    }

    if (value.gender == null || value.gender == "") {
      field_name = field_name + "Gender, ";
    }

    if (value.dateOfBirth == null || value.dateOfBirth == "") {
      field_name = field_name + "Date , ";
    }

    if (field_name.length != 0) {
      this.errorMessage = "Please enter " + field_name.substr(0, field_name.length-2);
      this.active = "2";
    } else {
      console.log("add school "+value.mobileNumbers.length);
      this.studentTO = value;
      console.log("adding school class id"+value.classId);
      console.log("dateOfBirth "+value.dateOfBirth);
      console.log("add rollNo"+value.rollNo);
      var d = new Date(value.dateOfBirth);
      var curr_date = d.getDate();
      var curr_month = d.getMonth() + 1; //Months are zero based
      var curr_year = d.getFullYear();

      value.dateOfBirth= (curr_date<10 ? '0'+curr_date : curr_date) + "-" + AppConstants.month_names_short[curr_month] + "-" + curr_year;
      console.log( (new Date().getFullYear()-2)+"   "+curr_year);
      if(new Date().getFullYear()-2<curr_year)
      {
        this.errorMessage = "Please enter valid date";
        this.active = "2";
      }
      else
      {
        this.studentConverter.addStudentProfile(this.studentTO.schoolId, this.studentTO, this);
      }
    }


  }


  /**
   * Used for updating the school profile.
   * @param value
   * @param valid
   */
  updateStudent({schoolId, value, valid}: { schoolId: string, value: StudentTO, valid: boolean }) {
    var field_name = "";
    this.errorMessage = field_name;
    this.active = "0";
    if (value.firstName == null || value.firstName == "") {
      field_name = field_name + "First Name, ";
    }
    if (value.lastName == null || value.lastName == "") {
      field_name = field_name + "Last Name, ";
    }

    if (value.gender == null || value.gender == "") {
      field_name = field_name + "Gender, ";
    }

    if (value.dateOfBirth == null || value.dateOfBirth == "") {
      field_name = field_name + "Date of Birth, ";
    }

    if (field_name.length != 0) {
      this.errorMessage = "Please enter " + field_name.substr(0, field_name.length-2);
      this.active = "2";
    } else {
      console.log("modify school "+value.mobileNumbers.length);
      this.upload();
      this.studentTO = value;
      console.log(value);
      console.log("modified rollno"+value.rollNo);
      console.log("dateOfBirth"+value.dateOfBirth);

      var d = new Date(value.dateOfBirth);
      var curr_date = d.getDate();
      var curr_month = d.getMonth() + 1; //Months are zero based
      var curr_year = d.getFullYear();

      value.dateOfBirth= (curr_date<10 ? '0'+curr_date : curr_date) + "-" + AppConstants.month_names_short[curr_month] + "-" + curr_year;
      console.log( (new Date().getFullYear()-2)+"   "+curr_year);
      if(new Date().getFullYear()-2<curr_year)
      {
        this.errorMessage = "Please enter valid date";
        this.active = "2";
      }
      else
      {
        this.studentConverter.updateStudent(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID), this.studentTO, this);
      }
    }
  }

  /**
   * Used for deleting the school profile.
   * @param schoolId , Studentid Array
   */
  deleteStudentProfile() {
    for (var loopvar = 0; loopvar < this.selectedStudentArray.length; loopvar++) {
      console.log(this.selectedStudentArray[loopvar]);
      this.studentConverter.deleteStudentProfile(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID), this.selectedStudentArray[loopvar]);
    }
    this.selectedStudentArray= [];
    this.getAllStudents(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID));

  }

  selectFile(event) {
    this.errorMessage = "";
    this.active = "0";

    var file_size=event.target.files.item(0).size;
    if(file_size>=AppConstants.PhotoMaxSize){
      this.errorMessage =AppConstants.IMAGE_ERROR_MESSAGE;
      this.updateMessage(this.errorMessage);
      this.active = "2";

    }
    else
    {
      console.log(file_size+"  file_size ");
      this.selectedFiles = event.target.files;
      this.showupload="1";
      console.log("selected file"+this.selectedFiles);
      var fileReader = new FileReader();
      fileReader.onload = function () {
        console.log("sdfsdfsdf"+ fileReader.result);
        $("#blah").attr("src",fileReader.result);
      }
      fileReader.readAsDataURL(this.selectedFiles.item(0));

    }
  }

  //upload(schoolId:string, studentId:string)
  upload() {
    if(this.selectedFiles!=null){
      const file = this.selectedFiles.item(0);
      this.currentFileUpload = new FileUpload(file);
      console.log(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID)+"    "+localStorage.getItem(AppConstants.SHAREDPREFERANCE_STUDENTID)+"  "+this.currentFileUpload+"   "+file);
      this.uploadService.pushFileToStorage(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID),  localStorage.getItem(AppConstants.SHAREDPREFERANCE_STUDENTID), this.currentFileUpload, this.progress);
      this.updateProgressbarUI();
    }
  }

  updateProgressbarUI()
  {
    console.log(" updateProgressbarUI  "+this.progress.percentage);
    if(this.progress.percentage==100)
    {
      this.currentFileUpload=null;
      this.active="1";
      this.sucessMessage="Image Uploaded Successfully";
      this.popupstatus = "0";
      this.showupload= "0";
    }
    else
    {
      setTimeout(() => {   this.updateProgressbarUI(); }, 500);
    }
  }









  //
  /**
   * This is a call back method
   * @param studentTO
   */
  displayStudentCallBack(studentTO: StudentTO) {
    console.log('Student Profile:', studentTO);

    console.log("displayStudentCallBack.." + studentTO.toString().valueOf());
    console.log("displayStudentCallBack..id " + studentTO.id);
    console.log("displayStudentCallBack..firstName " + studentTO.firstName);
    this.studentTO = studentTO;
    this.studentFormGroup.controls['id'].patchValue(studentTO.id);
    this.studentFormGroup.controls['firstName'].patchValue(studentTO.firstName);
    this.studentFormGroup.controls['lastName'].patchValue(studentTO.lastName);
    this.studentFormGroup.controls['middleName'].patchValue(studentTO.middleName);
    this.clearPhoneNumbers();
    this.clearPhoneNumbers();
//    console.log("displayStudentCallBack "+studentTO.mobileNumbers.length);
    if (studentTO.mobileNumbers != null) {
      console.log(studentTO.mobileNumbers.length);
      for (var loopvar = 0; loopvar < studentTO.mobileNumbers.length; loopvar++) {
        this.addPhoneNumber();
      }
      this.studentFormGroup.controls['mobileNumbers'].patchValue(studentTO.mobileNumbers);
    }
    if(studentTO.mobileNumbers== null|| studentTO.mobileNumbers.length==0)
      this.addPhoneNumber();


    this.clearSiblings();
    this.clearSiblings();
    if (studentTO.siblings != null) {
      console.log(studentTO.siblings.length);
      for (var loopvar = 0; loopvar < studentTO.siblings.length; loopvar++) {
        this.addSiblings();
      }
      this.studentFormGroup.controls['siblings'].patchValue(studentTO.siblings);
    }

    if(studentTO.siblings==null || studentTO.siblings.length==0)
      this.addSiblings();

    this.studentFormGroup.controls['gender'].patchValue(studentTO.gender);
    this.studentFormGroup.controls['landLine'].patchValue(studentTO.landLine);
    this.studentFormGroup.controls['addressOne'].patchValue(studentTO.addressOne);
    this.studentFormGroup.controls['addressTwo'].patchValue(studentTO.addressTwo);
    this.studentFormGroup.controls['city'].patchValue(studentTO.city);
    this.studentFormGroup.controls['state'].patchValue(studentTO.state);
    this.studentFormGroup.controls['country'].patchValue(studentTO.country);
    this.studentFormGroup.controls['pincode'].patchValue(studentTO.pincode);
    this.studentFormGroup.controls['bloodGroup'].patchValue(studentTO.bloodGroup);
    console.log("date of birth received is "+studentTO.dateOfBirth);
    if(studentTO.dateOfBirth===undefined || studentTO.dateOfBirth== null)
    {
      this.studentFormGroup.controls['dateOfBirth'].patchValue(new Date());
    }
    else
    {
      this.studentFormGroup.controls['dateOfBirth'].patchValue(studentTO.dateOfBirth);
    }
    if(studentTO.profilePhotoUrl===undefined || studentTO.profilePhotoUrl== null|| studentTO.profilePhotoUrl.length== 0)
    {
      this.studentFormGroup.controls['uploadPhoto'].patchValue(AppConstants.DEFAULT_STUDENT_IMAGE);
      $("#blah").attr("src",AppConstants.DEFAULT_STUDENT_IMAGE);
    }
    else
    {
      this.studentFormGroup.controls['uploadPhoto'].patchValue(studentTO.profilePhotoUrl);
      $("#blah").attr("src",studentTO.profilePhotoUrl);
    }
    console.log("profilePhotoUrl ======> "+studentTO.profilePhotoUrl);
    this.studentFormGroup.controls['fatherName'].patchValue(studentTO.fatherName);
    this.studentFormGroup.controls['motherName'].patchValue(studentTO.motherName);
    this.studentFormGroup.controls['rollNo'].patchValue(studentTO.rollNo);
    this.studentFormGroup.controls['classId'].patchValue(studentTO.classId);
    this.studentFormGroup.controls['className'].patchValue(studentTO.className);
    console.log("Class ======> "+studentTO.classId +"   "+studentTO.className);
    //this.dtTrigger.complete();

  }

  /**
   * Used for displaying all the students profile information.
   * @param schoolProfileTO
   */
  displayAllStudentCallBack(studentTO: FirebaseListObservable<StudentTO>) {
   // this.dtTrigger.complete();
    this.studentProfileTOList = studentTO;
    this.studentProfileTOList.forEach(schoolProfileTO => {
     // console.log('Student Photo URL:', schoolProfileTO.profilePhotoUrl);
     // console.log('Student Ojbect :', schoolProfileTO);
      //this.getPhotoWithURL(schoolProfileTO.schoolId, schoolProfileTO.profilePhotoUrl);
    });
    console.log('Display all Students');
    this.rerender();
  }


  displayAllClassesCallBack(classProfileTO: FirebaseListObservable<ClassProfileTO>) {
   
  }


  closePopup() {
    this.sucessMessage = "";
    this.active = "0";
    if (this.popupstatus == "1") this.showStudentsList();
    this.showClassSelection=false;
  }


  successMessageCallBack(messageTO: MessageTO) {
    console.log("successMessageCallBack : " + messageTO.serviceMethodName);
    if (messageTO.serviceMethodName == "searchAndAddStudent()") this.studentFormGroup.reset();
    if (messageTO.serviceMethodName == "updateStudentProfile()") this.popupstatus = "1";
    this.sucessMessage = messageTO.messageInfo;
    if (messageTO.messageInfo.length != 0) {
      this.active = "1";
    } else {
      this.active = "0";
    }
  }

  errorMessageCallBack(messageTO: MessageTO) {
    console.log("errorMessageCallBack ==>" + messageTO.messageInfo + "  " + messageTO.messageType + "  " + messageTO.serviceClassName + "  " + messageTO.serviceMethodName);
    //TODO Shiva - commented  to compile the code. Please fix it.
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

  public getRouter(): Router {
    return this.injector.get(Router);
  }

  /**
   * Used for getting the school profile.
   * @param schoolId
   */
  getStudent(schoolId: string, studentId: string) {

   // this.getPhoto(schoolId, studentId);
    this.studentConverter.getStudent(schoolId, studentId, this);

  }

  showClassPopup()
  {
    this.getAllClassesProfile(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID))
    this.showClassSelection=true;

  }

  showStudentsList() {

    if (this.selectedStudentArray.length > 0) (<HTMLInputElement>document.getElementById(this.selectedStudentArray[0])).checked = false;
    this.selectedStudentArray = [];
    this.div_Element_Id = "0";
    this.errorMessage = "";
    this.active = "0";
    this.showupload="0";
    this.getAllStudents(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID));

  }

  show_addStudentFields() {
    this.studentTO = new StudentTO();
    this.studentFormGroup.controls['id'].patchValue("");
    this.studentFormGroup.controls['firstName'].patchValue("");
    this.studentFormGroup.controls['lastName'].patchValue("");
    this.studentFormGroup.controls['middleName'].patchValue("");
    this.studentFormGroup.controls['gender'].patchValue("");
    this.studentFormGroup.controls['landLine'].patchValue("");
    this.studentFormGroup.controls['addressOne'].patchValue("");
    this.studentFormGroup.controls['addressTwo'].patchValue("");
    this.studentFormGroup.controls['city'].patchValue("");
    this.studentFormGroup.controls['state'].patchValue("");
    this.studentFormGroup.controls['country'].patchValue("");
    this.studentFormGroup.controls['pincode'].patchValue("");
    this.studentFormGroup.controls['bloodGroup'].patchValue("");
    this.studentFormGroup.controls['dateOfBirth'].patchValue(new Date());
    this.studentFormGroup.controls['uploadPhoto'].patchValue("");
    this.studentFormGroup.controls['fatherName'].patchValue("");
    this.studentFormGroup.controls['motherName'].patchValue("");
    this.studentFormGroup.controls['rollNo'].patchValue("");
    this.studentFormGroup.controls['classId'].patchValue("");
    this.studentFormGroup.controls['className'].patchValue("");
    this.clearPhoneNumbers();
    this.addPhoneNumber();
    this.clearSiblings();
    this.addSiblings();
    this.div_Element_Id = "1";

    // this.dtTrigger.complete();
  }

  getselectedStudentProfile() {
    this.div_Element_Id = "2";
    //TODO : Shiva integrate code by removing hardcoding of values.
    //this.getStudentProfile("school04", "-KuCWQEmwl1MsTD0SPdb");
    this.getStudentProfile(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID), this.selectedStudentArray[0]);
    console.log(this.selectedStudentArray[0]);
  }

  viewSingleStudentProfile() {
    this.div_Element_Id = "3";
    // this.dtTrigger.complete();
    this.getStudentProfile(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID), this.selectedStudentArray[0]);
  }


  checkedStudents(value) {
    console.log(value);
    if ((<HTMLInputElement>document.getElementById(value)).checked === true) {
      this.selectedStudentArray.push(value);
    } else if ((<HTMLInputElement>document.getElementById(value)).checked === false) {
      let indexx = this.selectedStudentArray.indexOf(value);
      this.selectedStudentArray.splice(indexx, 1)
    }
    console.log(this.selectedStudentArray)
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


  initPhoneNumbers() {
    return this.fb.group({
      // list all your form controls here, which belongs to your form array
      mobileNumber: ['']
    });
  }


  addPhoneNumber() {
    // control refers to your formarray
    const control = <FormArray>this.studentFormGroup.controls['mobileNumbers'];
    // add new formgroup
    control.push(this.initPhoneNumbers());
  }


  deletePhoneNumber(index: number) {
    // control refers to your formarray
    const control = <FormArray>this.studentFormGroup.controls['mobileNumbers'];
    // remove the chosen row
    control.removeAt(index);
  }


  clearPhoneNumbers() {
    const control = <FormArray>this.studentFormGroup.controls['mobileNumbers'];
    for (var loop = 0; loop < control.length; loop++)
      this.deletePhoneNumber(loop);
  }


  addSiblings() {
    const control = <FormArray>this.studentFormGroup.controls["siblings"];
    control.push(this.initSiblings());
  }


  initSiblings() {
    return this.fb.group({
      //keyInfo: [""], valueInfo: [""]
      Name: [""]
    });
  }

  deleteSiblings(index: number) {
    // control refers to your formarray
    const control = <FormArray>this.studentFormGroup.controls['siblings'];
    // remove the chosen row
    control.removeAt(index);
  }

  clearSiblings() {
    const control = <FormArray>this.studentFormGroup.controls['siblings'];
    for (var loop = 0; loop < control.length; loop++)
      this.deleteSiblings(loop);
  }


  getPhoto(schoolId: string, studentId: string) {

    //console.log("Called getPhoto ");

    //this.studentConverter.getPhoto(schoolId, studentId, this);

  }

  displayPhotoCallBack(url: string) {
    console.log("displayPhotoCallBack : Image URL " + url);
  }

  getPhotoWithURL(schoolId: string, photoURL: string) {
    console.log("Called getPhotoWithURL " + photoURL);
  }

  displayPhotoWithURLCallBack(url: string) {

    //TODO Shiva display the Image using the URL
   // this.photourl=url;
    console.log("displayPhotoWithURLCallBack : Image URL " + url)
  }

  onNotify(status:string):void {
    //alert(status);
    this.showClassSelection=false;
    if(status=="true")
    {
      this.studentFormGroup.controls['classId'].patchValue(localStorage.getItem(AppConstants.SHAREDPREFERANCE_STUDENTCLASSID));
      this.studentFormGroup.controls['className'].patchValue(localStorage.getItem(AppConstants.SHAREDPREFERANCE_STUDENTCLASSNAME));      
    }

  }
}
