import {Component, OnInit,ElementRef} from '@angular/core';
import {ViewChild} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from "rxjs";
// import {Router} from "@angular/router";
import {DataTableDirective} from 'angular-datatables';
import {FormBuilder, FormControl, FormGroup, FormArray} from "@angular/forms";
import { DatepickerOptions } from 'ng2-datepicker';
// import {inject} from "@angular/core/testing";
import {Subject} from 'rxjs/Rx';
import {ManageTeacher} from './manage-teacherinterface';

@Component({
  selector: 'app-manage-teacher',
  templateUrl: './manage-teacher.component.html',
  styleUrls: ['./manage-teacher.component.css'],
  providers:[ManageTeacher]
})
export class ManageTeacherComponent implements OnInit {

  selectedTeacherArray: Array<any> = [];
  errorMessage: string;
  sucessMessage: string;
  subscription: Subscription;
  message: string = '';
  // studentProfileTOList: FirebaseListObservable<StudentTO>;
  // classProfileTOList: FirebaseListObservable<ClassProfileTO>;
  // studentTO: StudentTO;
  teacherFormGroup: FormGroup;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  flag: boolean = false;
  // showClassSelection:boolean = false;
  // showCameraSelection:boolean = false;
  active: string = "0";// for error and success divs;;  0 for no content, 1 for success, 2 for error
  div_Element_Id: string = "0";//for multiple pages in school list page;;  0 to show list of school , 1 to show add school, 2 to show edit school, 3 to show single school view.
  
  // @Input() inputArray: ArrayType[];
  // updateSubject: BehaviorSubject<string> = new BehaviorSubject<string>(""); // Holds the error message
  // popupstatus: string = "0"; //0 for default close //1 for close and show listing
  // showupload: string = "0"; //0 for default close //1 for close and show listing
  teacherarray:ManageTeacher[] = [];
  teachernewarray:ManageTeacher[] = [];
  checkedval:number;
  checkedval1:number;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    this.teacherFormGroup = this.fb.group({
      firstName: [''],
      lastName: [''],
      middleName: [''],
      gender: [''],
      addressOne: [''],
      addressTwo: [''],
      city: [''],
      state: [''],
      country: [''],
      pincode: [''],
      teacherId: [''],
      ContactNo: [''],
      eamil: [''],
      profilePhotoUrl: [''],
      qualification: [''],
    });

  }

  closePopup() {
    // this.sucessMessage = "";
    this.active = "0";
    // this.showClassSelection=false;
    // if (this.popupstatus == "1")
     this.showTeacherList();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  show_addTeacherFields(){

    this.div_Element_Id="1";
  }

  addSTeacherProfile(value) {
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
    if (value.ContactNo == null || value.ContactNo == "") {
      field_name = field_name + "ContactNo , ";
    }
    if (value.eamil == null || value.eamil == "") {
      field_name = field_name + "eamil , ";
    }
    if (value.qualification == null || value.qualification == "") {
      field_name = field_name + "qualification , ";
    }
    value.profilePhotoUrl = "";

    if (field_name.length != 0) {
      this.errorMessage = "Please enter " + field_name.substr(0, field_name.length-2);
      this.active = "2";
    }
    else{
      var manageTeacher = new ManageTeacher();
      manageTeacher.teacherId = this.teacherarray.length;
      manageTeacher.firstName = value.firstName;
      manageTeacher.lastName = value.lastName;
      manageTeacher.middleName = value.middleName;
      manageTeacher.ContactNo = value.ContactNo;
      manageTeacher.eamil = value.eamil;
      manageTeacher.gender = value.gender;
      manageTeacher.qualification = value.qualification;
      manageTeacher.addressOne = value.addressOne;
      manageTeacher.addressTwo = value.addressTwo;
      manageTeacher.city = value.city;
      manageTeacher.state = value.state;
      manageTeacher.country = value.country;
      manageTeacher.pincode = value.pincode;

      this.teacherarray.push(manageTeacher);
      this.div_Element_Id="0";
      this.active="1";
    }

  }

  getselectedTeacherProfile(){
      this.div_Element_Id ="2";
      this.teacherFormGroup.controls['firstName'].patchValue(this.teacherarray[this.checkedval1].firstName);
      this.teacherFormGroup.controls['lastName'].patchValue(this.teacherarray[this.checkedval1].lastName);
      this.teacherFormGroup.controls['middleName'].patchValue(this.teacherarray[this.checkedval1].middleName);
      this.teacherFormGroup.controls['ContactNo'].patchValue(this.teacherarray[this.checkedval1].ContactNo);
      this.teacherFormGroup.controls['eamil'].patchValue(this.teacherarray[this.checkedval1].eamil);
      this.teacherFormGroup.controls['qualification'].patchValue(this.teacherarray[this.checkedval1].qualification);
      this.teacherFormGroup.controls['gender'].patchValue(this.teacherarray[this.checkedval1].gender);
      this.teacherFormGroup.controls['addressOne'].patchValue(this.teacherarray[this.checkedval1].addressOne);
      this.teacherFormGroup.controls['addressTwo'].patchValue(this.teacherarray[this.checkedval1].addressTwo);
      this.teacherFormGroup.controls['city'].patchValue(this.teacherarray[this.checkedval1].city);
      this.teacherFormGroup.controls['state'].patchValue(this.teacherarray[this.checkedval1].state);
      this.teacherFormGroup.controls['country'].patchValue(this.teacherarray[this.checkedval1].country);
      this.teacherFormGroup.controls['pincode'].patchValue(this.teacherarray[this.checkedval1].pincode);

  }

  updateTeacher(value){
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
    if (value.ContactNo == null || value.ContactNo == "") {
      field_name = field_name + "ContactNo , ";
    }
    if (value.eamil == null || value.eamil == "") {
      field_name = field_name + "eamil , ";
    }
    if (value.qualification == null || value.qualification == "") {
      field_name = field_name + "qualification , ";
    }
    value.profilePhotoUrl = "";

    if (field_name.length != 0) {
      this.errorMessage = "Please enter " + field_name.substr(0, field_name.length-2);
      this.active = "2";
    }
    else{
      var manageTeacher = new ManageTeacher();
      manageTeacher.teacherId = this.checkedval;
      manageTeacher.firstName = value.firstName;
      manageTeacher.lastName = value.lastName;
      manageTeacher.middleName = value.middleName;
      manageTeacher.ContactNo = value.ContactNo;
      manageTeacher.eamil = value.eamil;
      manageTeacher.gender = value.gender;
      manageTeacher.qualification = value.qualification;
      manageTeacher.addressOne = value.addressOne;
      manageTeacher.addressTwo = value.addressTwo;
      manageTeacher.city = value.city;
      manageTeacher.state = value.state;
      manageTeacher.country = value.country;
      manageTeacher.pincode = value.pincode;

      this.teacherarray[this.checkedval]=manageTeacher;
      this.div_Element_Id="0";
      this.active="1";
    }
  }


  deleteTeacherProfile(){
    this.teacherarray.splice(this.checkedval1,1);
    this.selectedTeacherArray=[];
    this.showTeacherList();
    this.rerender();
  }
 
 
  viewSingleFeeProfile(){
    this.div_Element_Id ="3";
    var rajuarray = new ManageTeacher();
    rajuarray = this.teacherarray[this.checkedval1];
    this.teachernewarray=[];
    this.teachernewarray.push(rajuarray);
  }
  
  checkedteacher(value,index){
   console.log("checked value"+ value);
   if ((<HTMLInputElement>document.getElementById("a"+value)).checked === true) {
         this.selectedTeacherArray.push(value);
         this.checkedval= value;
         this.checkedval1= index;
       } else if ((<HTMLInputElement>document.getElementById("a"+value)).checked === false) {
         let indexx = this.selectedTeacherArray.indexOf(value);
         this.selectedTeacherArray.splice(indexx, 1)
       }
       console.log(this.selectedTeacherArray);
  }
 
 
  showTeacherList(){
    this.selectedTeacherArray=[];
    this.div_Element_Id ="0";
    this.teacherFormGroup.controls['firstName'].patchValue('');
    this.teacherFormGroup.controls['lastName'].patchValue('');
    this.teacherFormGroup.controls['middleName'].patchValue('');
    this.teacherFormGroup.controls['ContactNo'].patchValue('');
    this.teacherFormGroup.controls['eamil'].patchValue('');
    this.teacherFormGroup.controls['qualification'].patchValue('');
    this.teacherFormGroup.controls['gender'].patchValue('');
    this.teacherFormGroup.controls['addressOne'].patchValue('');
    this.teacherFormGroup.controls['addressTwo'].patchValue('');
    this.teacherFormGroup.controls['city'].patchValue('');
    this.teacherFormGroup.controls['state'].patchValue('');
    this.teacherFormGroup.controls['country'].patchValue('');
    this.teacherFormGroup.controls['pincode'].patchValue('');
   this.rerender();
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
