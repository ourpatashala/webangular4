import {Component, OnInit,Inject} from '@angular/core';
import {ViewChild} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {Router} from "@angular/router";
import {DataTableDirective} from 'angular-datatables';
import {FormBuilder, FormControl, FormGroup, FormArray} from "@angular/forms";
import { DatepickerOptions } from 'ng2-datepicker';
import {inject} from "@angular/core/testing";
import {Subject} from 'rxjs/Rx';
import {ManageUser} from './manage-userinterface';
import {style, state, animate, transition, trigger} from '@angular/core';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css'],
  providers:[ManageUser],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({opacity:0}),
        animate(500, style({opacity:1})) 
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(500, style({opacity:0})) 
      ])
    ]),
  ]
})
export class ManageUserComponent implements OnInit {

  // state: string = 'small';
  userFormGroup:FormGroup;
  checkedval:number;
  checkedval1:number;
  // classtable:boolean=false;
  errorMessage: string;
  active: string = "0";// for error and success divs;;  0 for no content, 1 for success, 2 for error
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  flag: boolean = false;
  upload_img: boolean = false;
  // Usertype: new Date(),
  div_Element_Id: string = '0';//for multiple pages in school list page;; 0 to show list of school , 1 to show add school, 2 to show edit school, 3 to show single school view.
  selectedUserArray: Array<any> = [];
  userarray:ManageUser[] = [];
  userNewarray:ManageUser[] = [];


  constructor( private fb:FormBuilder) { 

    

  }

  ngOnInit() {
    this.userFormGroup = this.fb.group({

      
    uniqueId : [''],
    Name: [''],
    UserId: [''],
    Role: [''],
    Usertype: [''],
    Phone: [''],
      
    });
  }

  closePopup() {
    // this.sucessMessage = "";
    this.active = "0";
    // this.showClassSelection=false;
    // if (this.popupstatus == "1")
     this.showUserList();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  // toggleme(){
  //   this.upload_img= !this.upload_img;
  //   this.state = (this.state === 'small' ? 'large' : 'small');
  // }
  show_addUserFields(){
    this.div_Element_Id="1";
    // this.selectedUserArray=[''];
  }



  addUserSubmit(value){

// console.log(value);
// this.userarray= new Array<ManageUser>();
 if(value.Name =="" ||value.Name == null){
   this.errorMessage = "please enter Name";
   this.active ="2";
 }
 else if(value.UserId =="" ||value.UserId == null){
   this.errorMessage = "please enter UserId";
   this.active ="2";
 }
 else if(value.Role =="" ||value.Role == null){
   this.errorMessage = "please enter Role";
   this.active ="2";
 }
 else if(value.Usertype =="" ||value.Usertype == null){
   this.errorMessage = "please enter Usertype";
   this.active ="2";
 }
 else if(value.Phone =="" ||value.Phone == null){
   this.errorMessage = "please enter Phone";
   this.active ="2";
 }
 else{
    var manageUser = new ManageUser();
    manageUser.Name = value.Name;
    manageUser.uniqueId = this.userarray.length;
    manageUser.UserId = value.UserId;
    manageUser.Role = value.Role;
    manageUser.Usertype = value.Usertype;
    manageUser.Phone = value.Phone;
  this.userarray.push(manageUser);

  console.log('class Name' + value.Name);
  console.log('UserId' + value.UserId);
  console.log('uniqueId Name' + manageUser.uniqueId);
  console.log("userarray val" + this.userarray.length);
  // this.showUserList();
  // this.div_Element_Id="0";
  this.active ="1";
  
 }
}




getselectedUserProfile(){
  this.div_Element_Id ="2";
      this.userFormGroup.controls['Name'].patchValue(this.userarray[this.checkedval1].Name);
      this.userFormGroup.controls['UserId'].patchValue( this.userarray[this.checkedval1].UserId);
      this.userFormGroup.controls['Role'].patchValue( this.userarray[this.checkedval1].Role);
      this.userFormGroup.controls['Usertype'].patchValue( this.userarray[this.checkedval1].Usertype);
      this.userFormGroup.controls['Phone'].patchValue( this.userarray[this.checkedval1].Phone);

  console.log('Name of patch'+this.userarray[this.checkedval1].Name);
 }



 UpdateUserSubmit(value){

      if(value.Name =="" ||value.Name == null){
        this.errorMessage = "please enter Name";
        this.active ="2";
      }
      else if(value.UserId =="" ||value.UserId == null){
        this.errorMessage = "please enter UserId";
        this.active ="2";
      }
      else if(value.Role =="" ||value.Role == null){
        this.errorMessage = "please enter Role";
        this.active ="2";
      }
      else if(value.Usertype =="" ||value.Usertype == null){
        this.errorMessage = "please enter Usertype";
        this.active ="2";
      }
      else if(value.Phone =="" ||value.Phone == null){
        this.errorMessage = "please enter Phone";
        this.active ="2";
      }
      else{
              var manageUser = new ManageUser();
              manageUser.Name = value.Name;
              manageUser.uniqueId = this.checkedval;
              manageUser.UserId = value.UserId;
              manageUser.Role = value.Role;
              manageUser.Usertype = value.Usertype;
              manageUser.Phone = value.Phone;
            this.userarray[this.checkedval]=manageUser;
          this.div_Element_Id="0";
          // this.showUserList();
          this.active ="1";
  }
  
 }

 deleteUser(){
   this.userarray.splice(this.checkedval1,1);
   this.selectedUserArray=[];
   this.showUserList();
   this.rerender();
 }


 viewSingleUserProfile(){
   this.div_Element_Id ="3";
   var rajuarray = new ManageUser();
   rajuarray = this.userarray[this.checkedval1];
   this.userNewarray=[];
   this.userNewarray.push(rajuarray);
 }
 
 checkedmasterUser(value,index){
  console.log("checked value"+ value);
  if ((<HTMLInputElement>document.getElementById("a"+value)).checked === true) {
        this.selectedUserArray.push(value);
        this.checkedval= value;
        this.checkedval1= index;
      } else if ((<HTMLInputElement>document.getElementById("a"+value)).checked === false) {
        let indexx = this.selectedUserArray.indexOf(value);
        this.selectedUserArray.splice(indexx, 1)
      }
      console.log(this.selectedUserArray);
 }



 showUserList(){
   this.selectedUserArray=[];
   this.div_Element_Id ="0";
  this.userFormGroup.controls['Name'].patchValue('');
  this.userFormGroup.controls['UserId'].patchValue('');
  this.userFormGroup.controls['Role'].patchValue('');
  this.userFormGroup.controls['Usertype'].patchValue('');
  this.userFormGroup.controls['Phone'].patchValue('');
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
