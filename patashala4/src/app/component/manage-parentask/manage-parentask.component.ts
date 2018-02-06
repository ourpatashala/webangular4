import {Component, OnInit,Inject} from '@angular/core';
import {ViewChild} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {Router} from "@angular/router";
import {DataTableDirective} from 'angular-datatables';
import {FormBuilder, FormControl, FormGroup, FormArray} from "@angular/forms";
import { DatepickerOptions } from 'ng2-datepicker';
import {inject} from "@angular/core/testing";
import {Subject} from 'rxjs/Rx';
import {ManageParent} from './manage-parentaskinterface';

@Component({
  selector: 'app-manage-parentask',
  templateUrl: './manage-parentask.component.html',
  styleUrls: ['./manage-parentask.component.css'],
  providers:[ManageParent]
})
export class ManageParentaskComponent implements OnInit {

  parentFormGroup:FormGroup;
  checkedval:number;
  checkedval1:number;
  // classtable:boolean=false;
  errorMessage: string;
  active: string = "0";// for error and success divs;;  0 for no content, 1 for success, 2 for error
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  flag: boolean = false;
  // Usertype: new Date(),
  div_Element_Id: string = '0';//for multiple pages in school list page;; 0 to show list of school , 1 to show add school, 2 to show edit school, 3 to show single school view.
  selectedparentarray: Array<any> = [];
  parentarray:ManageParent[] = [];
  parentNewarray:ManageParent[] = [];


  constructor( private fb:FormBuilder) { 

    

  }

  ngOnInit() {
    this.parentFormGroup = this.fb.group({
     
      ParentId : [''],
      SerialNo: [''],
      Category: [''],
     
      });
  }

  closePopup() {
    // this.sucessMessage = "";
    this.active = "0";
    // this.showClassSelection=false;
    // if (this.popupstatus == "1")
     this.showParentList();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

 
  show_addParentFields(){
    this.div_Element_Id="1";
    // this.selectedparentarray=[''];
  }



  addParentAsk(value){

// console.log(value);
// this.parentarray= new Array<ManageParent>();
 if(value.SerialNo =="" ||value.SerialNo == null){
   this.errorMessage = "please enter SerialNo";
   this.active ="2";
 }
 else if(value.Category =="" ||value.Category == null){
   this.errorMessage = "please enter Category";
   this.active ="2";
 }


 else{
    var manageParent = new ManageParent();
    manageParent.SerialNo = value.SerialNo;
    manageParent.ParentId = this.parentarray.length;
    manageParent.Category = value.Category;
   
  this.parentarray.push(manageParent);

  console.log('class SerialNo' + value.SerialNo);
  console.log('Category' + value.Category);
  console.log('ParentId SerialNo' + manageParent.ParentId);
  console.log("parentarray val" + this.parentarray.length);
  // this.showParentList();
  // this.div_Element_Id="0";
  this.active ="1";
  
 }
}




getselectedParentProfile(){
  this.div_Element_Id ="2";
      this.parentFormGroup.controls['SerialNo'].patchValue(this.parentarray[this.checkedval1].SerialNo);
      this.parentFormGroup.controls['Category'].patchValue( this.parentarray[this.checkedval1].Category);
     
  // console.log('SerialNo of patch'+this.parentarray[this.checkedval1].SerialNo);
 }



 UpdateParentAsk(value){

      if(value.SerialNo =="" ||value.SerialNo == null){
        this.errorMessage = "please enter SerialNo";
        this.active ="2";
      }
      else if(value.Category =="" ||value.Category == null){
        this.errorMessage = "please enter Category";
        this.active ="2";
      }
    
      else{
            var manageParent = new ManageParent();
            manageParent.SerialNo = value.SerialNo;
            manageParent.ParentId = this.checkedval;
            manageParent.Category = value.Category;

            this.parentarray[this.checkedval]=manageParent;
          this.div_Element_Id="0";
          // this.showParentList();
          this.active ="1";
  }
  
 }

 deleteParentask(){
   this.parentarray.splice(this.checkedval1,1);
   this.selectedparentarray=[];
   this.showParentList();
   this.rerender();
 }


 viewSingleParentaskProfile(){
   this.div_Element_Id ="3";
   var rajuarray = new ManageParent();
   rajuarray = this.parentarray[this.checkedval1];
   this.parentNewarray=[];
   this.parentNewarray.push(rajuarray);
 }
 
 checkedmasterParent(value,index){
  console.log("checked value"+ value);
  if ((<HTMLInputElement>document.getElementById("a"+value)).checked === true) {
        this.selectedparentarray.push(value);
        this.checkedval= value;
        this.checkedval1= index;
      } else if ((<HTMLInputElement>document.getElementById("a"+value)).checked === false) {
        let indexx = this.selectedparentarray.indexOf(value);
        this.selectedparentarray.splice(indexx, 1)
      }
      console.log(this.selectedparentarray);
 }



 showParentList(){
   this.selectedparentarray=[];
   this.div_Element_Id ="0";
  this.parentFormGroup.controls['SerialNo'].patchValue('');
  this.parentFormGroup.controls['Category'].patchValue('');
 
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
