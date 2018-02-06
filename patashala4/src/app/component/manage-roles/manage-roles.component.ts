import {Component, OnInit,Inject} from '@angular/core';
import {ViewChild} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {Router} from "@angular/router";
import {DataTableDirective} from 'angular-datatables';
import {FormBuilder, FormControl, FormGroup, FormArray} from "@angular/forms";
import { DatepickerOptions } from 'ng2-datepicker';
import {inject} from "@angular/core/testing";
import {Subject} from 'rxjs/Rx';
import {ManageParent} from '../manage-parentask/manage-parentaskinterface';

@Component({
  selector: 'app-manage-roles',
  templateUrl: './manage-roles.component.html',
  styleUrls: ['./manage-roles.component.css']
})
export class ManageRolesComponent implements OnInit {

  roleFormGroup:FormGroup;
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
  selectedrolearray: Array<any> = [];
  rolearray:ManageParent[] = [];
  roleNewarray:ManageParent[] = [];


  constructor(private fb:FormBuilder) { 

    

  }

  ngOnInit() {
    this.roleFormGroup = this.fb.group({
     
      // ParentId : [''],
      // SerialNo: [''],
      // Category: [''],
     
      });
  }

  closePopup() {
    // this.sucessMessage = "";
    this.active = "0";
    // this.showClassSelection=false;
    // if (this.popupstatus == "1")
     this.showroleList();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

 
  show_addroleFields(){
    this.div_Element_Id="1";
    // this.selectedrolearray=[''];
  }



  addRolesSubmit(value){

// // console.log(value);
// // this.rolearray= new Array<ManageParent>();
//  if(value.SerialNo =="" ||value.SerialNo == null){
//    this.errorMessage = "please enter SerialNo";
//    this.active ="2";
//  }
//  else if(value.Category =="" ||value.Category == null){
//    this.errorMessage = "please enter Category";
//    this.active ="2";
//  }


//  else{
//     var manageParent = new ManageParent();
//     manageParent.SerialNo = value.SerialNo;
//     manageParent.ParentId = this.rolearray.length;
//     manageParent.Category = value.Category;
   
//   this.rolearray.push(manageParent);

//   console.log('class SerialNo' + value.SerialNo);
//   console.log('Category' + value.Category);
//   console.log('ParentId SerialNo' + manageParent.ParentId);
//   console.log("rolearray val" + this.rolearray.length);
//   // this.showroleList();
//   // this.div_Element_Id="0";
//   this.active ="1";
  
//  }
}




getselectedroleProfile(){
  // this.div_Element_Id ="2";
  //     this.roleFormGroup.controls['SerialNo'].patchValue(this.rolearray[this.checkedval1].SerialNo);
  //     this.roleFormGroup.controls['Category'].patchValue( this.rolearray[this.checkedval1].Category);
     
  // console.log('SerialNo of patch'+this.rolearray[this.checkedval1].SerialNo);
 }



 UpdateRolesSubmit(value){

  //     if(value.SerialNo =="" ||value.SerialNo == null){
  //       this.errorMessage = "please enter SerialNo";
  //       this.active ="2";
  //     }
  //     else if(value.Category =="" ||value.Category == null){
  //       this.errorMessage = "please enter Category";
  //       this.active ="2";
  //     }
    
  //     else{
  //           var manageParent = new ManageParent();
  //           manageParent.SerialNo = value.SerialNo;
  //           manageParent.ParentId = this.checkedval;
  //           manageParent.Category = value.Category;

  //           this.rolearray[this.checkedval]=manageParent;
  //         this.div_Element_Id="0";
  //         // this.showroleList();
  //         this.active ="1";
  // }
  
 }

 deleteroles(){
  //  this.rolearray.splice(this.checkedval1,1);
  //  this.selectedrolearray=[];
  //  this.showroleList();
  //  this.rerender();
 }


 viewSingleroleProfile(){
  //  this.div_Element_Id ="3";
  //  var rajuarray = new ManageParent();
  //  rajuarray = this.rolearray[this.checkedval1];
  //  this.roleNewarray=[];
  //  this.roleNewarray.push(rajuarray);
 }
 
 checkedmasterrole(value,index){
  // console.log("checked value"+ value);
  // if ((<HTMLInputElement>document.getElementById("a"+value)).checked === true) {
  //       this.selectedrolearray.push(value);
  //       this.checkedval= value;
  //       this.checkedval1= index;
  //     } else if ((<HTMLInputElement>document.getElementById("a"+value)).checked === false) {
  //       let indexx = this.selectedrolearray.indexOf(value);
  //       this.selectedrolearray.splice(indexx, 1)
  //     }
  //     console.log(this.selectedrolearray);
 }



 showroleList(){
  // this.selectedrolearray=[];
   this.div_Element_Id ="0";
  // this.roleFormGroup.controls['SerialNo'].patchValue('');
  // this.roleFormGroup.controls['Category'].patchValue('');
 
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
