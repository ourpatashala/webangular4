import {Component, OnInit, Input, Inject, PipeTransform, Pipe, Injector} from '@angular/core';
import {StudentService} from "../../service/student.service";
import {StudentConverter} from "../../adapter/interfaces/StudentConverter";
import {StudentTO} from "../../to/StudentTO";
import {StudentConverterImpl} from "../../adapter/impl/StudentConverterImpl";
import {
  FormGroup, FormControl, Validators, FormBuilder, FormArray, AbstractControl
}
  from "@angular/forms";
import {ArrayType} from "@angular/compiler/src/output/output_ast";

import {StudentComponentInterface} from "./StudentComponentInterface";
import {jsonpFactory} from "@angular/http/src/http_module";
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import {AngularFireAuth} from "angularfire2/auth";

import {Messages} from "../../constants/Messages";
import {Router} from "@angular/router";
import {ErrorService} from "../../service/error.service";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
declare var $: any;
import { Subject } from 'rxjs/Rx';




@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  providers: [StudentService, {provide: "StudentConverter", useClass: StudentConverterImpl}],
  styleUrls: ['./student.component.css']
})

export class StudentComponent implements OnInit, StudentComponentInterface {


  selectedStudentArray:Array<any>= [];
  dtOptions: DataTables.Settings = {};
  x:string;
  errorMessage:string;
  sucessMessage:string;
  subscription: Subscription;
  message: string = '';
  dtTrigger = new Subject();

  studentTO: StudentTO;
  studentFormGroup: FormGroup;

  active:string="0";// for error and success divs;;  0 for no content, 1 for success, 2 for error
  div_Element_Id: string= "0";//for multiple pages in school list page;;  0 to show list of school , 1 to show add school, 2 to show edit school, 3 to show single school view.



  fb: FormBuilder;
  @Input() inputArray: ArrayType[];


  updateSubject: BehaviorSubject<string> = new BehaviorSubject<string>(""); // Holds the error message

  update$: Observable<string> = this.updateSubject.asObservable(); // observer for the above message


  constructor(@Inject("StudentConverter") private studentConverter: StudentConverter, fb: FormBuilder, private injector: Injector, private errorService: ErrorService) {
    this.fb = fb;
    this.subscription = this.update$.subscribe(
      message => {
        this.message = message;
      });
  }




  ngOnInit() {
    this.studentFormGroup = new FormGroup(
      {
        //id: new FormControl(""),
        //schoolId: new FormControl(""),
        //rollNo: new FormControl(""),

        firstName: new FormControl(""),
        //lastName: new FormControl(""),
        //middleName: new FormControl(""),
        //classId: new FormControl(""),

        //gender: new FormControl(""),
        //mobileNumber: new FormControl(""),

        //landLine: new FormControl(""),
        //bloodGroup: new FormControl(""),
        //dob: new FormControl(""),
        //profilePhotoUrl: new FormControl(""),

        //fatherName: new FormControl(""),
        //motherName: new FormControl(""),

      }
    );

  }


  addPhoneNumbers() {
    const control = <FormArray>this.studentFormGroup.controls["phoneNumbers"];
    control.push(this.initPhoneNumbers());
  }


  addSiblings() {
    const control = <FormArray>this.studentFormGroup.controls["siblings"];
    control.push(this.initSiblings());
  }


  initPhoneNumbers() {
    return this.fb.group({
      phoneNumber: [""]
    });
  }


  initSiblings() {
    return this.fb.group({
      keyInfo: [""],
      valueInfo: [""]
    });
  }


  getStudentProfile(schoolId: string, studentId: string) {

    this.studentConverter.getStudent(schoolId, studentId, this);

  }

  addStudentProfile({value, valid}: { value: StudentTO, valid: boolean }) {
    //this.studentTO = value;

    //console.log("addStudentProfile.." + value.toString().valueOf());

    console.log("addStudentProfile.." );


    //this.studentConverter.addStudentProfile(this.studentTO.schoolId, this.studentTO, this);
    //this.studentConverter.getStudent(this.studentTO.schoolId, this.studentTO.id, this);
    //this.studentConverter.updateStudent(this.studentTO.schoolId, this.studentTO, this);
  }

  /**
   * Used for updating the school profile.
   * @param value
   * @param valid
   */
  updateStudent({schoolId, value, valid}: {schoolId: string, value: StudentTO, valid: boolean}) {
    this.studentTO = value;
    this.studentConverter.updateStudent(schoolId, this.studentTO,this);
  }

  /**
   * This is a call back method
   * @param studentTO
   */
  displayStudentCallBack(studentTO: StudentTO) {
    console.log("displayStudentCallBack.." + studentTO.toString().valueOf());
    console.log("displayStudentCallBack..id " + studentTO.id);
    console.log("displayStudentCallBack..firstName " + studentTO.firstName);
  }

  /**
   * Used for displaying all the students profile information.
   * @param schoolProfileTO
   */
  displayAllStudentCallBack(studentTO: FirebaseListObservable<StudentTO>) {

  }

  successMessageCallBack(message: string) {
    console.log(message);
  }

  /**
   * Handle all the error messages here . Basing on the error message decide where you want to display
   * the Error Message, Also if required you can recirect to any page basing on the navigate method
   * given below.
   *
   * @param message
   */
  errorMessageCallBack(message: string) {
    console.log("error message call back..")
    this.errorMessage = message;
    //this.schoolFormGroup.reset();
    this.updateMessage(this.errorMessage);
    this.getRouter().navigate([""]);
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
  getStudent(schoolId:string, studentId: string){
    this.studentConverter.getStudent(schoolId, studentId,this);
  }


  showSchoolsList()
  {
    if(this.selectedStudentArray.length>0)
      (<HTMLInputElement>document.getElementById(this.selectedStudentArray[0])).checked = false;
    this.selectedStudentArray = [];
    this.div_Element_Id="0";
    this.errorMessage = "";
    this.active="0";
  }

  show_addStudentFields()
  {
    this.div_Element_Id="1";
  }
  getselectedStudentProfile()
  {
    this.div_Element_Id="2";
  }
  viewSingleStudentProfile()
  {
    this.div_Element_Id="3";
  }








}
