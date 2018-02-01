import {Component, OnInit,ElementRef, Inject} from '@angular/core';
import {ViewChild} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {Router} from "@angular/router";
import {DataTableDirective} from 'angular-datatables';
import {FormBuilder, FormControl, FormGroup, FormArray} from "@angular/forms";
import { DatepickerOptions } from 'ng2-datepicker';
import {inject} from "@angular/core/testing";
import {Subject} from 'rxjs/Rx';
 import {Managecalendar} from './manage-calendarinterface';

@Component({
  selector: 'app-manage-calendar',
  templateUrl: './manage-calendar.component.html',
  styleUrls: ['./manage-calendar.component.css'],
  providers:[Managecalendar]
})
export class ManageCalendarComponent implements OnInit {

  dateOptions: DatepickerOptions = {
    displayFormat: 'DD-MMM-YYYY',
    barTitleFormat: 'MMMM YYYY',
    minYear: 1970,
    maxYear: 2030,
    firstCalendarDay: 0 //; // 0 - Sunday, 1 - Monday
  };


  calendarFormGroup:FormGroup;
  checkedval:number;
  // classtable:boolean=false;
  errorMessage: string;
  active: string = "0";// for error and success divs;;  0 for no content, 1 for success, 2 for error
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  flag: boolean = false;
  // Startdate: new Date(),
  div_Element_Id: string = '0';//for multiple pages in school list page;; 0 to show list of school , 1 to show add school, 2 to show edit school, 3 to show single school view.
  selectedCalenderArray: Array<any> = [];
  calendararray:Managecalendar[] = [];
  calendararray1:Managecalendar[] = [];


  closePopup() {
    // this.sucessMessage = "";
    this.active = "0";
    // this.showClassSelection=false;
    // if (this.popupstatus == "1")
     this.showCalendarList();
  }


  constructor( private fb:FormBuilder ) {  }

  ngOnInit() {
    this.calendarFormGroup = this.fb.group({

      'serialNo' : [''],
      'calendarDate' : new Date(),
      'eventName' :[''],
      
    });
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  show_addClassFields(){
    this.div_Element_Id="1";
    // this.selectedCalenderArray=[''];
  }



  addcalendarEvent(value){

// console.log(value);
// this.calendararray= new Array<Manageclass>();
 if(value.serialNo =="" ||value.serialNo == null){
   this.errorMessage = "please enter serialNo";
   this.active ="2";
 }
 else if(value.calendarDate =="" ||value.calendarDate == null){
   this.errorMessage = "please enter calendarDate";
   this.active ="2";
 }
 else if(value.eventName =="" ||value.eventName == null){
   this.errorMessage = "please enter calendarDate";
   this.active ="2";
 }
 else{
    var managecalendar = new Managecalendar();
    managecalendar.serialNo = value.serialNo;
    managecalendar.calendarDate = value.calendarDate;
    managecalendar.eventName = value.eventName;
    managecalendar.eventId = this.calendararray.length+1;
    
  this.calendararray.push(managecalendar);

  console.log('class Name' + value.serialNo);
  console.log('Course Name' + value.calendarDate);
  console.log('classId Name' + managecalendar.eventName);
  console.log("class array val" + this.calendararray.length);
  // this.showCalendarList();
  this.div_Element_Id="0";
  this.active ="1";
  
 }
}




 getselectedClassProfile(){
  this.div_Element_Id ="2";
      this.calendarFormGroup.controls['serialNo'].patchValue(this.calendararray[this.checkedval].serialNo);
      this.calendarFormGroup.controls['calendarDate'].patchValue( this.calendararray[this.checkedval].calendarDate);
      this.calendarFormGroup.controls['eventName'].patchValue( this.calendararray[this.checkedval].eventName);
  console.log('serialNo of patch'+this.calendararray[this.checkedval].serialNo);
 }



 updateCalendarEvent(value){

  if(value.serialNo =="" ||value.serialNo == null){
    this.errorMessage = "please enter serialNo";
    this.active ="2";
  }
  else if(value.calendarDate =="" ||value.calendarDate == null){
    this.errorMessage = "please enter calendarDate";
    this.active ="2";
  }
  else if(value.eventName =="" ||value.eventName == null){
    this.errorMessage = "please enter eventName";
    this.active ="2";
  }
 
  else{
    var managecalendar = new Managecalendar();
    managecalendar.serialNo = value.serialNo;
    managecalendar.calendarDate = value.calendarDate;
    managecalendar.eventName = value.eventName;
    managecalendar.eventId = this.checkedval+1;
      this.calendararray[this.checkedval]=managecalendar;
      this.selectedCalenderArray=[];
      this.showCalendarList();
  }
  
 }

 deleteClass(){
   this.calendararray.splice(this.checkedval,1);
  this.selectedCalenderArray=[];
   this.showCalendarList();
  
 }


 viewSingleClassProfile(){
   this.div_Element_Id ="3";
   var rajuarray = new Managecalendar();
   rajuarray = this.calendararray[this.checkedval];
   this.calendararray1=[];
   this.calendararray1.push(rajuarray);
 }

 

 
checkedmasterClass(value){
  console.log("checked value"+ value);
  if ((<HTMLInputElement>document.getElementById("a"+value)).checked === true) {
        this.selectedCalenderArray.push(value);
        this.checkedval= value - 1;
      } else if ((<HTMLInputElement>document.getElementById("a"+value)).checked === false) {
        let indexx = this.selectedCalenderArray.indexOf(value);
        this.selectedCalenderArray.splice(indexx, 1)
      }
      console.log(this.selectedCalenderArray);
 }



 showCalendarList(){
  
   this.selectedCalenderArray=[];
   this.div_Element_Id ="0";
  this.calendarFormGroup.controls['serialNo'].patchValue('');
  this.calendarFormGroup.controls['calendarDate'].patchValue(new Date());
  this.calendarFormGroup.controls['eventName'].patchValue('');
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
