import {Component, OnInit, Input, Inject, PipeTransform, Pipe, Injector} from '@angular/core';
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

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  providers: [StudentService, {provide: "StudentConverter", useClass: StudentConverterImpl}],
  styleUrls: ['./student.component.css']
})

export class StudentComponent implements OnInit, StudentComponentInterface {
  className: any;


  selectedFiles: FileList
  currentFileUpload: FileUpload
  progress: {percentage: number} = {percentage: 0}



  selectedStudentArray: Array<any> = [];
  errorMessage: string;
  sucessMessage: string;
  subscription: Subscription;
  message: string = '';
  studentProfileTOList: FirebaseListObservable<StudentTO>;
  classProfileTOList: FirebaseListObservable<ClassProfileTO>;
  studentTO: StudentTO;
  studentFormGroup: FormGroup;

  dtElement: DataTableDirective;
 // dtElementclass: DataTableDirective;
  
  dtOptions: DataTables.Settings = {};
  dtOptionsclass: DataTables.Settings = {};
  //dtTrigger = new Subject();
  dtTrigger: Subject<any> = new Subject();
  dtTriggerclass: Subject<any> = new Subject();
  flag: boolean = false;
  showClassSelection:boolean = false;
  active: string = "0";// for error and success divs;;  0 for no content, 1 for success, 2 for error
  div_Element_Id: string = "0";//for multiple pages in school list page;;  0 to show list of school , 1 to show add school, 2 to show edit school, 3 to show single school view.
  fb: FormBuilder;
  @Input() inputArray: ArrayType[];
  updateSubject: BehaviorSubject<string> = new BehaviorSubject<string>(""); // Holds the error message
  popupstatus: string = "0"; //0 for default close //1 for close and show listing
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
    var selectedSchoolId = localStorage.getItem('schoolid');
    console.log("Selected School " + selectedSchoolId);
    if (selectedSchoolId == "" || selectedSchoolId == "Undefined" || selectedSchoolId == null) {
      this.router.navigate(['/School']);
    }
    this.getAllStudents(localStorage.getItem('schoolid'));
  }

  ngAfterViewInit(): void {
    this.dtTriggerclass.next();
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
      dateOfBirth: [''],
      uploadPhoto: [''],
      fatherName: [''],
      motherName: [''],
      rollNo: [''],
      classId: [''],
      schoolId: [localStorage.getItem('schoolid')],
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


  getStudentProfile(schoolId: string, studentId: string) {
    localStorage.setItem('studentId',studentId);
    this.getPhoto(schoolId, studentId);
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
      this.errorMessage = "Please enter " + field_name;
      this.active = "2";
    } else {
      console.log("add school "+value.mobileNumbers.length);
      this.studentTO = value;
      console.log("adding school class id"+value.classId);
      console.log("dATEoFbIRTH"+value.dateOfBirth);
      console.log("add rollNo"+value.rollNo);
       this.studentConverter.addStudentProfile(this.studentTO.schoolId, this.studentTO, this);
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
      field_name = field_name + "dateOfBirth, ";
    }

    if (field_name.length != 0) {
      this.errorMessage = "Please enter " + field_name;
      this.active = "2";
    } else {
      console.log("modify school "+value.mobileNumbers.length);
      this.upload();
      this.studentTO = value;
      console.log(value);
      console.log("modified rollno"+value.rollNo);
      console.log("dATEoFbIRTH"+value.dateOfBirth);
      this.studentConverter.updateStudent(localStorage.getItem('schoolid'), this.studentTO, this);
    }
  }

  /**
   * Used for deleting the school profile.
   * @param schoolId , Studentid Array
   */
  deleteStudentProfile() {
    for (var loopvar = 0; loopvar < this.selectedStudentArray.length; loopvar++) {
      console.log(this.selectedStudentArray[loopvar]);
      this.studentConverter.deleteStudentProfile(localStorage.getItem('schoolid'), this.selectedStudentArray[loopvar]);
    }
    this.getAllStudents(localStorage.getItem('schoolid'));

  }








  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  //upload(schoolId:string, studentId:string)
  upload() {
    const file = this.selectedFiles.item(0)
    this.currentFileUpload = new FileUpload(file);
    console.log(localStorage.getItem('schoolid')+"    "+localStorage.getItem('studentId'));
    this.uploadService.pushFileToStorage(localStorage.getItem('schoolid'),  localStorage.getItem('studentId'), this.currentFileUpload, this.progress)
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
    this.studentFormGroup.controls['dateOfBirth'].patchValue(studentTO.dateOfBirth);
    this.studentFormGroup.controls['uploadPhoto'].patchValue(studentTO.profilePhotoUrl);
    this.studentFormGroup.controls['fatherName'].patchValue(studentTO.fatherName);
    this.studentFormGroup.controls['motherName'].patchValue(studentTO.motherName);
    this.studentFormGroup.controls['rollNo'].patchValue(studentTO.rollNo);
    this.studentFormGroup.controls['classId'].patchValue(studentTO.classId);
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
getClassId(classNames)
{
  console.log(classNames);
  this.className=classNames;
  this.studentFormGroup.controls['classId'].patchValue(classNames);
}

  displayAllClassesCallBack(classProfileTO: FirebaseListObservable<ClassProfileTO>) {
    this.classProfileTOList=classProfileTO;
    classProfileTO.forEach(classsProfileTO => {
      console.log('class Profile:', classsProfileTO);
    });
    this.rerender();
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
    // setTimeout(() => {    //<<<---    using ()=> syntax
    //   this.sucessMessage = "";
    //   this.active = "0";
    // }, 2000);
  }

  /**
   * Handle all the error messages here . Basing on the error message decide where you want to display
   * the Error Message, Also if required you can recirect to any page basing on the navigate method
   * given below.
   *
   * @param message
   */
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
    this.getAllClassesProfile(localStorage.getItem('schoolid'))
    this.showClassSelection=true;
  }

  showStudentsList() {

    if (this.selectedStudentArray.length > 0) (<HTMLInputElement>document.getElementById(this.selectedStudentArray[0])).checked = false;
    this.selectedStudentArray = [];
    this.div_Element_Id = "0";
    this.errorMessage = "";
    this.active = "0";
    this.getAllStudents(localStorage.getItem('schoolid'));

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
    this.studentFormGroup.controls['dateOfBirth'].patchValue("");
    this.studentFormGroup.controls['uploadPhoto'].patchValue("");
    this.studentFormGroup.controls['fatherName'].patchValue("");
    this.studentFormGroup.controls['motherName'].patchValue("");
    this.studentFormGroup.controls['rollNo'].patchValue("");
    this.studentFormGroup.controls['classId'].patchValue("");
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
    this.getStudentProfile(localStorage.getItem('schoolid'), this.selectedStudentArray[0]);
    console.log(this.selectedStudentArray[0]);
  }

  viewSingleStudentProfile() {
    this.div_Element_Id = "3";
    // this.dtTrigger.complete();
    this.getStudentProfile(localStorage.getItem('schoolid'), this.selectedStudentArray[0]);
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
    console.log("render call " + this.flag);
    if (!this.flag && this.dtElement != null) {
      this.flag = true;
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        console.log("shiva 111" +dtInstance);
        // Destroy the table first
        dtInstance.destroy();
        // Call the dtTrigger to rerender again
        console.log("shiva 222");
        if(this.dtTrigger!=null)
          this.dtTrigger.next();
        else
          console.log("error as null");
        this.flag = false;
      });
    }
    console.log("`sdfsdfsdfsd` shiva "+this.dtElement.dtInstance);
    // console.log("sdfsdfsdfsd shiva "+this.dtElementclass.dtInstance);
    // if (this.dtElementclass != null) {
    //   this.flag = true;
    //   this.dtElementclass.dtInstance.then((dtInstanceclass: DataTables.Api) => {
    //     console.log("shiva 111");
    //     // Destroy the table first
    //     dtInstanceclass.destroy();
    //     console.log("dtInstanceclass destroy");
        
    //     // Call the dtTrigger to rerender again
    //     if(this.dtTriggerclass!=null)
    //     {
    //       console.log("dt Success");
    //       this.dtTriggerclass.next();
    //       console.log("dt Success");
    //     }
    //     else
    //       console.log("error as null dtTriggerclass");

    //     this.flag = false;
    //   });
    // }


    

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

    //TODO Shiva display the Image using the URL
    //this.photourl=url;
    console.log("displayPhotoCallBack : Image URL " + url);
  }

  getPhotoWithURL(schoolId: string, photoURL: string) {

    console.log("Called getPhotoWithURL " + photoURL);

    /*if (photoURL != null) {

      this.studentConverter.getPhotoWithURL(schoolId, photoURL, this);

    } else {

      console.log("Called getPhotoWithURL UNDEFINED");

    }*/
  }

  displayPhotoWithURLCallBack(url: string) {

    //TODO Shiva display the Image using the URL
   // this.photourl=url;
    console.log("displayPhotoWithURLCallBack : Image URL " + url)
  }


}
