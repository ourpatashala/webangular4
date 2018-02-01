import {Component, OnInit,ElementRef, Inject} from '@angular/core';
import {ViewChild} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {Router} from "@angular/router";
import {DataTableDirective} from 'angular-datatables';
import {FormBuilder, FormControl, FormGroup, FormArray} from "@angular/forms";
import { DatepickerOptions } from 'ng2-datepicker';
import {inject} from "@angular/core/testing";
import {Subject} from 'rxjs/Rx';
import {ManageFee} from './manage-feesinterface';

@Component({
  selector: 'app-manage-fees',
  templateUrl: './manage-fees.component.html',
  host: {
    '(document:click)': 'handleClick($event)', 
  },
  styleUrls: ['./manage-fees.component.css'],
  providers:[ManageFee]
})
export class ManageFeesComponent implements OnInit {


    
  dateOptions: DatepickerOptions = {
    displayFormat: 'DD-MMM-YYYY',
    barTitleFormat: 'MMMM YYYY',
    minYear: 1970,
    maxYear: 2030,
    firstCalendarDay: 0 //; // 0 - Sunday, 1 - Monday
  };


  feeFormGroup:FormGroup;
  checkedval:number;
  // classtable:boolean=false;
  errorMessage: string;
  active: string = "0";// for error and success divs;;  0 for no content, 1 for success, 2 for error
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  flag: boolean = false;
  // Amount: new Date(),
  div_Element_Id: string = '0';//for multiple pages in school list page;; 0 to show list of school , 1 to show add school, 2 to show edit school, 3 to show single school view.
  selectedFeesArray: Array<any> = [];
  public query = '';
  public feeClassarray = ["1st Class","2nd Class","3rd Class","4th Class","5th Class","6th Class","7th Class","8th Class","9th Class","10th Class" ];
  public filteredList = [];
  public elementRef;
  feesarray:ManageFee[] = [];
  feesarray1:ManageFee[] = [];


  constructor(myElement: ElementRef, private fb:FormBuilder) { 

      this.elementRef = myElement;

  }

  ngOnInit() {
    this.feeFormGroup = this.fb.group({

      
    ClassId : [''],
    serialNo: [''],
    className: [''],
    term: [''],
    Amount: [''],
    duedate : new Date(),
    remark: [''],
      
    });
  }


  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  show_addClassFields(){
    this.div_Element_Id="1";
    // this.selectedFeesArray=[''];
  }


 filter() {
    if (this.query !== ""){
        this.filteredList = this.feeClassarray.filter(function(el){
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

addFeeSubmit(value){

// console.log(value);
// this.feesarray= new Array<ManageFee>();
 if(value.className =="" ||value.className == null){
   this.errorMessage = "please enter className";
   this.active ="2";
 }
 else if(value.serialNo =="" ||value.serialNo == null){
   this.errorMessage = "please enter serialNo";
   this.active ="2";
 }
 else if(value.term =="" ||value.term == null){
   this.errorMessage = "please enter term";
   this.active ="2";
 }
 else if(value.Amount =="" ||value.Amount == null){
   this.errorMessage = "please enter Amount";
   this.active ="2";
 }
 else if(value.duedate =="" ||value.duedate == null){
   this.errorMessage = "please enter duedate";
   this.active ="2";
 }
 else if(value.remark =="" ||value.remark == null){
   this.errorMessage = "please enter remark";
   this.active ="2";
 }
 else{
    var manageFee = new ManageFee();
    manageFee.className = value.className;
    manageFee.ClassId = this.feesarray.length + 1;
    manageFee.serialNo = value.serialNo;
    manageFee.term = value.term;
    manageFee.Amount = value.Amount;
    manageFee.duedate = value.duedate;
    manageFee.remark = value.remark;
  this.feesarray.push(manageFee);

  console.log('class Name' + value.className);
  console.log('serialNo' + value.serialNo);
  console.log('ClassId Name' + manageFee.ClassId);
  console.log("feesarray val" + this.feesarray.length);
  // this.showClassList();
  // this.div_Element_Id="0";
  this.active ="1";
  
 }
}




 getselectedClassProfile(){
  this.div_Element_Id ="2";
      this.feeFormGroup.controls['className'].patchValue(this.feesarray[this.checkedval].className);
      this.feeFormGroup.controls['serialNo'].patchValue( this.feesarray[this.checkedval].serialNo);
      this.feeFormGroup.controls['term'].patchValue( this.feesarray[this.checkedval].term);
      this.feeFormGroup.controls['Amount'].patchValue( this.feesarray[this.checkedval].Amount);
      this.feeFormGroup.controls['duedate'].patchValue( this.feesarray[this.checkedval].duedate);
      this.feeFormGroup.controls['remark'].patchValue( this.feesarray[this.checkedval].remark);

  console.log('classname of patch'+this.feesarray[this.checkedval].className);
 }



 UpdateFeeSubmit(value){

  if(value.className =="" ||value.className == null){
    this.errorMessage = "please enter className";
    this.active ="2";
  }
  else if(value.serialNo =="" ||value.serialNo == null){
    this.errorMessage = "please enter serialNo";
    this.active ="2";
  }
  else if(value.term =="" ||value.term == null){
    this.errorMessage = "please enter term";
    this.active ="2";
  }
  else if(value.Amount =="" ||value.Amount == null){
    this.errorMessage = "please enter Amount";
    this.active ="2";
  }
  else if(value.duedate =="" ||value.duedate == null){
    this.errorMessage = "please enter duedate";
    this.active ="2";
  }
  else if(value.remark =="" ||value.remark == null){
    this.errorMessage = "please enter remark";
    this.active ="2";
  }
  else{
       var manageFee = new ManageFee();
        manageFee.className = value.className;
        manageFee.ClassId = this.feesarray.length + 1;
        manageFee.serialNo = value.serialNo;
        manageFee.term = value.term;
        manageFee.Amount = value.Amount;
        manageFee.duedate = value.duedate;
        manageFee.remark = value.remark;
        this.feesarray[this.checkedval]=manageFee;
      this.selectedFeesArray=[];
      this.showClassList();
  }
  
 }

 deleteClass(){
   this.feesarray.splice(this.checkedval,1);
  this.selectedFeesArray=[];
  //  this.showClassList();
  
 }


 viewSingleClassProfile(){
   this.div_Element_Id ="3";
   var rajuarray = new ManageFee();
   rajuarray = this.feesarray[this.checkedval];
   this.feesarray1=[];
   this.feesarray1.push(rajuarray);
 }

 

 
checkedmasterClass(value){
  console.log("checked value"+ value);
  if ((<HTMLInputElement>document.getElementById("a"+value)).checked === true) {
        this.selectedFeesArray.push(value);
        this.checkedval= value - 1;
      } else if ((<HTMLInputElement>document.getElementById("a"+value)).checked === false) {
        let indexx = this.selectedFeesArray.indexOf(value);
        this.selectedFeesArray.splice(indexx, 1)
      }
      console.log(this.selectedFeesArray);
 }



 showClassList(){
  
   this.selectedFeesArray=[];
   this.div_Element_Id ="0";
  this.feeFormGroup.controls['className'].patchValue('');
  this.feeFormGroup.controls['serialNo'].patchValue('');
  this.feeFormGroup.controls['term'].patchValue('');
  this.feeFormGroup.controls['Amount'].patchValue(new Date());
  this.feeFormGroup.controls['duedate'].patchValue(new Date());
  this.feeFormGroup.controls['remark'].patchValue('');
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
