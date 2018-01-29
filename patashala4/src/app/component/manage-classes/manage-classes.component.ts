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

  showClassList(){
    this.div_Element_Id ="0";
    this.selectedClassesArray=[];
    this.classFormGroup.controls['className'].patchValue('');
    this.classFormGroup.controls['CourseName'].patchValue('');
    this.classFormGroup.controls['BatchNo'].patchValue('');
    this.classFormGroup.controls['Startdate'].patchValue(new Date());
    this.classFormGroup.controls['Enddate'].patchValue(new Date());
    this.classFormGroup.controls['No_ofperiods'].patchValue('');
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

console.log(value);
// this.classarray= new Array<Manageclass>();
    var manageclass = new Manageclass();
    manageclass.className = value.className;
     manageclass.classId = this.classarray.length + 1;
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
  this.showClassList();
}



checkedmasterClass(value){
  console.log("checked value"+ value);
  if ((<HTMLInputElement>document.getElementById("a"+value)).checked === true) {
        this.selectedClassesArray.push(value);
        this.checkedval= value - 1;
      } else if ((<HTMLInputElement>document.getElementById("a"+value)).checked === false) {
        let indexx = this.selectedClassesArray.indexOf(value);
        this.selectedClassesArray.splice(indexx, 1)
      }
      console.log(this.selectedClassesArray);
 }


 getselectedClassProfile(){
  this.div_Element_Id ="2";
      this.classFormGroup.controls['className'].patchValue(this.classarray[this.checkedval].className);
      this.classFormGroup.controls['CourseName'].patchValue( this.classarray[this.checkedval].CourseName);
      this.classFormGroup.controls['BatchNo'].patchValue( this.classarray[this.checkedval].BatchNo);
      this.classFormGroup.controls['Startdate'].patchValue( this.classarray[this.checkedval].Startdate);
      this.classFormGroup.controls['Enddate'].patchValue( this.classarray[this.checkedval].Enddate);
      this.classFormGroup.controls['No_ofperiods'].patchValue( this.classarray[this.checkedval].No_ofperiods);
  console.log('classname of patch'+this.classarray[this.selectedClassesArray[0]].className);
 }



 updateClassSubmit(value){

      var manageclass = new Manageclass();
        manageclass.className = value.className;
        manageclass.classId = this.classarray.length + 1;
        manageclass.CourseName = value.CourseName;
        manageclass.BatchNo = value.BatchNo;
        manageclass.Startdate = value.Startdate;
        manageclass.Enddate = value.Enddate;
        manageclass.No_ofperiods = value.No_ofperiods;
        this.classarray[this.checkedval]=value;
      //this.classarray.push(manageclass);

  this.showClassList();
 }

 deleteClass(){
   this.classarray.splice(this.checkedval,1);
  this.selectedClassesArray=[];
  //  this.showClassList();
  
 }

 viewSingleClassProfile(){

   this.div_Element_Id ="3";
   var rajuarray = new Manageclass();
   rajuarray = this.classarray[this.checkedval];
   this.rajuarray1.push(rajuarray);
 }
























}
