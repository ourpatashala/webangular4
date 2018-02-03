import {Component, OnInit,ElementRef, Inject} from '@angular/core';
import {ViewChild} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {Router} from "@angular/router";
import {DataTableDirective} from 'angular-datatables';
import {FormBuilder, FormControl, FormGroup, FormArray} from "@angular/forms";
import { DatepickerOptions } from 'ng2-datepicker';
import {inject} from "@angular/core/testing";
import {Subject} from 'rxjs/Rx';
import {Manageclass} from './manage-classesinterface';




@Component({
  selector: 'app-manage-classes',
  templateUrl: './manage-classes.component.html',
  host: {
    '(document:click)': 'handleClick($event)', 
  },
  styleUrls: ['./manage-classes.component.css'],
  providers:[Manageclass]
})
export class ManageClassesComponent implements OnInit {

  classFormGroup:FormGroup;
  checkedval:number;
  checkedval1:number;
  // classtable:boolean=false;
  errorMessage: string;
  active: string = "0";// for error and success divs;;  0 for no content, 1 for success, 2 for error
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  flag: boolean = false;
  // Startdate: new Date(),
  div_Element_Id: string = '0';//for multiple pages in school list page;; 0 to show list of school , 1 to show add school, 2 to show edit school, 3 to show single school view.
  selectedClassesArray: Array<any> = [];
  public query = '';
  public teacherarray = ["Raju","Prasad","Shiva","Nithin","Panday","Reethu","Bhanu","Mahesh","Dinesh","Richard","Albert","John","Jack","Henry","Dave","Mikel","Uday","Pramod","Richard","Donald" ];
  public filteredList = [];
  public elementRef;
  classarray:Manageclass[] = [];
  rajuarray1:Manageclass[] = [];
  // manageclass:Manageclass;
  
  
  dateOptions: DatepickerOptions = {
    displayFormat: 'DD-MMM-YYYY',
    barTitleFormat: 'MMMM YYYY',
    minYear: 1970,
    maxYear: 2030,
    firstCalendarDay: 0 //; // 0 - Sunday, 1 - Monday
  };
  dateOptions1: DatepickerOptions = {
    displayFormat: 'DD-MMM-YYYY',
    barTitleFormat: 'MMMM YYYY',
    minYear: 1970,
    maxYear: 2030,
    firstCalendarDay: 0 //; // 0 - Sunday, 1 - Monday
  };

  
  closePopup() {
    // this.sucessMessage = "";
    this.active = "0";
    // this.showClassSelection=false;
    // if (this.popupstatus == "1")
     this.showClassList();
  }


  constructor(myElement: ElementRef, private fb:FormBuilder ) {

    this.elementRef = myElement;


   }

  ngOnInit() {
    this.classFormGroup = this.fb.group({

      'classId' : [''],
      'className' : [''],
      'CourseName' : [''],
      'BatchNo' :  [''],
      'Startdate' : new Date(),
      'Enddate' : new Date(),
      'No_ofperiods' :  [''],
      
    });
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  show_addClassFields(){
    this.div_Element_Id="1";
    // this.selectedClassesArray=[''];
  }


 filter() {
    if (this.query !== ""){
        this.filteredList = this.teacherarray.filter(function(el){
            return el.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
        }.bind(this));
    }
  else{
        this.filteredList = [];
    }
}
 
select(item){
    this.query = item;
    this.filteredList = [];
}

handleClick(event){
  var clickedComponent = event.target;
  var inside = false;
  do {
      if (clickedComponent === this.elementRef.nativeElement) {
          inside = true;
      }
     clickedComponent = clickedComponent.parentNode;
  } while (clickedComponent);
   if(!inside){
       this.filteredList = [];
   }
}

addClassSubmit(value){

// console.log(value);
// this.classarray= new Array<Manageclass>();
 if(value.className =="" ||value.className == null){
   this.errorMessage = "please enter className";
   this.active ="2";
 }
 else if(value.CourseName =="" ||value.CourseName == null){
   this.errorMessage = "please enter CourseName";
   this.active ="2";
 }
 else if(value.BatchNo =="" ||value.BatchNo == null){
   this.errorMessage = "please enter BatchNo";
   this.active ="2";
 }
 else if(value.Startdate =="" ||value.Startdate == null){
   this.errorMessage = "please enter Startdate";
   this.active ="2";
 }
 else if(value.Enddate =="" ||value.Enddate == null){
   this.errorMessage = "please enter Enddate";
   this.active ="2";
 }
 else if(value.No_ofperiods =="" ||value.No_ofperiods == null){
   this.errorMessage = "please enter No_ofperiods";
   this.active ="2";
 }
 else{
    var manageclass = new Manageclass();
    manageclass.className = value.className;
     manageclass.classId = this.classarray.length;
    manageclass.CourseName = value.CourseName;
    manageclass.BatchNo = value.BatchNo;
    manageclass.Startdate = value.Startdate;
    manageclass.Enddate = value.Enddate;
    manageclass.No_ofperiods = value.No_ofperiods;
  this.classarray.push(manageclass);

  console.log('class Name' + value.className);
  console.log('Course Name' + value.CourseName);
  console.log('classId Name' + manageclass.classId);
  console.log("class array val" + this.classarray.length);
  // this.showClassList();
  // this.div_Element_Id="0";
  this.active ="1";
  
 }
}




 getselectedClassProfile(){
  this.div_Element_Id ="2";
      this.classFormGroup.controls['className'].patchValue(this.classarray[this.checkedval1].className);
      this.classFormGroup.controls['CourseName'].patchValue( this.classarray[this.checkedval1].CourseName);
      this.classFormGroup.controls['BatchNo'].patchValue( this.classarray[this.checkedval1].BatchNo);
      this.classFormGroup.controls['Startdate'].patchValue( this.classarray[this.checkedval1].Startdate);
      this.classFormGroup.controls['Enddate'].patchValue( this.classarray[this.checkedval1].Enddate);
      this.classFormGroup.controls['No_ofperiods'].patchValue( this.classarray[this.checkedval1].No_ofperiods);
  console.log('classname of patch'+this.classarray[this.checkedval1].className);
 }



 updateClassSubmit(value){

  if(value.className =="" ||value.className == null){
    this.errorMessage = "please enter className";
    this.active ="2";
  }
  else if(value.CourseName =="" ||value.CourseName == null){
    this.errorMessage = "please enter CourseName";
    this.active ="2";
  }
  else if(value.BatchNo =="" ||value.BatchNo == null){
    this.errorMessage = "please enter BatchNo";
    this.active ="2";
  }
  else if(value.Startdate =="" ||value.Startdate == null){
    this.errorMessage = "please enter Startdate";
    this.active ="2";
  }
  else if(value.Enddate =="" ||value.Enddate == null){
    this.errorMessage = "please enter Enddate";
    this.active ="2";
  }
  else if(value.No_ofperiods =="" ||value.No_ofperiods == null){
    this.errorMessage = "please enter No_ofperiods";
    this.active ="2";
  }
  else{
      var manageclass = new Manageclass();
        manageclass.className = value.className;
        manageclass.classId =   this.checkedval;
        manageclass.CourseName = value.CourseName;
        manageclass.BatchNo = value.BatchNo;
        manageclass.Startdate = value.Startdate;
        manageclass.Enddate = value.Enddate;
        manageclass.No_ofperiods = value.No_ofperiods;
        this.classarray[this.checkedval]=manageclass;
      this.selectedClassesArray=[];
      this.showClassList();
  }
  
 }

 deleteClass(){
   this.classarray.splice(this.checkedval1,1);
  this.selectedClassesArray=[];
  //  this.showClassList();
  this.rerender();
 }


 viewSingleClassProfile(){
   this.div_Element_Id ="3";
   var rajuarray = new Manageclass();
   rajuarray = this.classarray[this.checkedval1];
   this.rajuarray1=[];
   this.rajuarray1.push(rajuarray);
 }

 

 
checkedmasterClass(value,index){
  console.log("checked value"+ value);
  if ((<HTMLInputElement>document.getElementById("a"+value)).checked === true) {
        this.selectedClassesArray.push(value);
        this.checkedval= value;
        this.checkedval1= index;
      } else if ((<HTMLInputElement>document.getElementById("a"+value)).checked === false) {
        let indexx = this.selectedClassesArray.indexOf(value);
        this.selectedClassesArray.splice(indexx, 1)
      }
      console.log(this.selectedClassesArray);
 }



 showClassList(){
  
   this.selectedClassesArray=[];
   this.div_Element_Id ="0";
  this.classFormGroup.controls['className'].patchValue('');
  this.classFormGroup.controls['CourseName'].patchValue('');
  this.classFormGroup.controls['BatchNo'].patchValue('');
  this.classFormGroup.controls['Startdate'].patchValue(new Date());
  this.classFormGroup.controls['Enddate'].patchValue(new Date());
  this.classFormGroup.controls['No_ofperiods'].patchValue('');
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
