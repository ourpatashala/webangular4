import {Component, OnInit,ElementRef, Inject} from '@angular/core';
import {ViewChild} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {Router} from "@angular/router";
import {DataTableDirective} from 'angular-datatables';
import {FormBuilder, FormGroup,Validators, FormControl} from "@angular/forms";
import { DatepickerOptions } from 'ng2-datepicker';
import {inject} from "@angular/core/testing";
import {Subject} from 'rxjs/Rx';
 import {Managecontact} from './manage-contactsinterface';
@Component({
  selector: 'app-manage-contacts',
  templateUrl: './manage-contacts.component.html',
  styleUrls: ['./manage-contacts.component.css'],
  providers:[Managecontact]
})
export class ManageContactsComponent implements OnInit {

 
  contactFormGroup:FormGroup;
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
  selectedContactArray: Array<any> = [];
  contactArray:Managecontact[] = [];
  contactArray1:Managecontact[] = [];
  //primaryEmailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  closePopup() {
    // this.sucessMessage = "";
    this.active = "0";
    // this.showClassSelection=false;
    // if (this.popupstatus == "1")
     this.showContactList();
  }

 // primaryEmailCtrl: FormControl;
  constructor( private fb:FormBuilder ) {
    this.contactFormGroup = this.fb.group({
      'serialNo' : [''],
      'Name' : [''],
      'Designation' : [''],
      'Phonenumber' : [''],
      'Dept_group' :[''],
      'primaryEmail' : [''],
      
    });
    }

  ngOnInit() {
   
  }
//   get primaryEmail() {
//     return this.contactFormGroup.get('primaryEmail');
// } 
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  show_addContactFields(){
    this.div_Element_Id="1";
    // this.selectedContactArray=[''];
  }



addcontact(value){
      // console.log(value);
      // this.contactArray= new Array<Manageclass>();
      if(value.serialNo =="" ||value.serialNo == null){
        this.errorMessage = "please enter serialNo";
        this.active ="2";
      }
      else if(value.Name =="" ||value.Name == null){
        this.errorMessage = "please enter Name";
        this.active ="2";
      }
      else if(value.Designation =="" ||value.Designation == null){
        this.errorMessage = "please enter Designation";
        this.active ="2";
      }
      else if(value.Phonenumber =="" ||value.Phonenumber == null){
        this.errorMessage = "please enter Phonenumber";
        this.active ="2";
      }
      else if(value.primaryEmail =="" ||value.primaryEmail == null){
        this.errorMessage = "please enter Email";
        this.active ="2";
      }
      else if(value.Dept_group =="" ||value.Dept_group == null){
        this.errorMessage = "please enter Dept_group";
        this.active ="2";
      }
      else{
          var managecontact = new Managecontact();
          managecontact.serialNo = value.serialNo;
          managecontact.Name = value.Name;
          managecontact.Designation = value.Designation;
          managecontact.Phonenumber = value.Phonenumber;
          managecontact.primaryEmail = value.primaryEmail;
          managecontact.Dept_group = value.Dept_group;
          managecontact.contactId = this.contactArray.length;
          
        this.contactArray.push(managecontact);

        console.log('contact serial' + value.serialNo);
        console.log('contact Name' + value.Name);
        console.log('contact Designation' + managecontact.Designation);
        console.log("contact array val" + this.contactArray.length);
        // this.showContactList();
        this.div_Element_Id="0";
        this.active ="1";
        
      }
}




getselectedContactProfile(){
  this.div_Element_Id ="2";
      this.contactFormGroup.controls['serialNo'].patchValue(this.contactArray[this.checkedval1].serialNo);
      this.contactFormGroup.controls['Name'].patchValue( this.contactArray[this.checkedval1].Name);
      this.contactFormGroup.controls['Designation'].patchValue( this.contactArray[this.checkedval1].Designation);
      this.contactFormGroup.controls['Phonenumber'].patchValue( this.contactArray[this.checkedval1].Phonenumber);
      this.contactFormGroup.controls['primaryEmail'].patchValue( this.contactArray[this.checkedval1].primaryEmail);
      this.contactFormGroup.controls['Dept_group'].patchValue( this.contactArray[this.checkedval1].Dept_group);

  console.log('serialNo of patch'+this.contactArray[this.checkedval1].serialNo);
 }



 UpdateContact(value){

    if(value.serialNo =="" ||value.serialNo == null){
      this.errorMessage = "please enter serialNo";
      this.active ="2";
    }
    else if(value.Name =="" ||value.Name == null){
      this.errorMessage = "please enter Name";
      this.active ="2";
    }
    else if(value.Designation =="" ||value.Designation == null){
      this.errorMessage = "please enter Designation";
      this.active ="2";
    }
    else if(value.Phonenumber =="" ||value.Phonenumber == null){
      this.errorMessage = "please enter Phonenumber";
      this.active ="2";
    }
    else if(value.primaryEmail =="" ||value.primaryEmail == null){
      this.errorMessage = "please enter Email";
      this.active ="2";
    }
    else if(value.Dept_group =="" ||value.Dept_group == null){
      this.errorMessage = "please enter Dept_group";
      this.active ="2";
    }
 
  else{
      var managecontact = new Managecontact();
      managecontact.serialNo = value.serialNo;
      managecontact.Name = value.Name;
      managecontact.Designation = value.Designation;
      managecontact.Phonenumber = value.Phonenumber;
      managecontact.primaryEmail = value.primaryEmail;
      managecontact.Dept_group = value.Dept_group;
      managecontact.contactId = this.checkedval;
      this.contactArray[this.checkedval]=managecontact;
      this.div_Element_Id="0";
        this.active ="1";
  }
  
 }

 deleteContact(){
   this.contactArray.splice(this.checkedval1,1);
  this.selectedContactArray=[];
   this.showContactList();
   this.rerender();
 }


 viewSingleContactProfile(){
   this.div_Element_Id ="3";
   var rajuarray = new Managecontact();
   rajuarray = this.contactArray[this.checkedval1];
   this.contactArray1=[];
   this.contactArray1.push(rajuarray);
 }

 

 
 checkedmasterContact(value,index){
  console.log("checked value"+ value);
  if ((<HTMLInputElement>document.getElementById("a"+value)).checked === true) {
        this.selectedContactArray.push(value);
        this.checkedval= value;
        this.checkedval1= index;
      } else if ((<HTMLInputElement>document.getElementById("a"+value)).checked === false) {
        let indexx = this.selectedContactArray.indexOf(value);
        this.selectedContactArray.splice(indexx, 1)
      }
      console.log('check box value' + this.selectedContactArray);
 }



 showContactList(){
   this.selectedContactArray=[];
   this.div_Element_Id ="0";
  this.contactFormGroup.controls['serialNo'].patchValue('');
  this.contactFormGroup.controls['Name'].patchValue('');
  this.contactFormGroup.controls['Designation'].patchValue('');
  this.contactFormGroup.controls['Phonenumber'].patchValue('');
  this.contactFormGroup.controls['primaryEmail'].patchValue('');
  this.contactFormGroup.controls['Dept_group'].patchValue('');
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
