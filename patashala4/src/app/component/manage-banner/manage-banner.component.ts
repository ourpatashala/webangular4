import {Component, OnInit,ElementRef, Inject} from '@angular/core';
import {ViewChild} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {Router} from "@angular/router";
import {DataTableDirective} from 'angular-datatables';
import {FormBuilder, FormControl, FormGroup, FormArray} from "@angular/forms";
import { DatepickerOptions } from 'ng2-datepicker';
import {inject} from "@angular/core/testing";
import {Subject} from 'rxjs/Rx';
import {ManageBanner} from './manage-bannerinterface';

@Component({
  selector: 'app-manage-banner',
  templateUrl: './manage-banner.component.html',
  styleUrls: ['./manage-banner.component.css']
})
export class ManageBannerComponent implements OnInit {


    
  bannerFormGroup:FormGroup;
  checkedval:number;
  checkedval1:number;
  idx:any;
  // classtable:boolean=false;
  errorMessage: string;
  active: string = "0";// for error and success divs;;  0 for no content, 1 for success, 2 for error
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  flag: boolean = false;
  // StartDate: new Date(),
  div_Element_Id: string = '0';//for multiple pages in school list page;; 0 to show list of school , 1 to show add school, 2 to show edit school, 3 to show single school view.
  selectedBannerArray: Array<any> = [];
  bannerarray:ManageBanner[] = [];
  banviewarray:ManageBanner[] = [];
  // ManageBanner:ManageBanner;
  
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

  ind : any = 1;

  
  closePopup() {
    // this.sucessMessage = "";
    this.active = "0";
    // this.showClassSelection=false;
    // if (this.popupstatus == "1")
     this.showBannerList();
  }


  constructor( private fb:FormBuilder ) {   }

  ngOnInit() {
    this.bannerFormGroup = this.fb.group({
      'BannerId' : [''],
      'serialNo' : [''],
      'School' : [''],
      'Message' :  [''],
      'StartDate' : new Date(),
      'EndDate' : new Date(),
     
      
    });
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  show_addBannerFields(){
    this.div_Element_Id="1";
    // this.selectedBannerArray=[''];
  }

  addEvent(value){

// console.log(value);
// this.bannerarray= new Array<ManageBanner>();
 if(value.serialNo =="" ||value.serialNo == null){
   this.errorMessage = "please enter serialNo";
   this.active ="2";
 }
 else if(value.School =="" ||value.School == null){
   this.errorMessage = "please enter Class/School";
   this.active ="2";
 }
 else if(value.Message =="" ||value.Message == null){
   this.errorMessage = "please enter Message";
   this.active ="2";
 }
 else if(value.StartDate =="" ||value.StartDate == null){
   this.errorMessage = "please enter StartDate";
   this.active ="2";
 }
 else if(value.EndDate =="" ||value.EndDate == null){
   this.errorMessage = "please enter EndDate";
   this.active ="2";
 }
 
 else{
    var manageBanner = new ManageBanner();
    manageBanner.serialNo = value.serialNo;
    manageBanner.BannerId = this.bannerarray.length;
    manageBanner.School = value.School;
    manageBanner.Message = value.Message;
    manageBanner.StartDate = value.StartDate;
    manageBanner.EndDate = value.EndDate;
  this.bannerarray.push(manageBanner);

  console.log('class Name' + value.serialNo);
  console.log('Course Name' + value.School);
  console.log('BannerId Name' + manageBanner.BannerId);
  console.log("class array val" + this.bannerarray.length);
  // this.showBannerList();
  this.div_Element_Id="0";
  this.active ="1";
  
 }
}




 getselectedBannerProfile(){
  this.div_Element_Id ="2";
      this.bannerFormGroup.controls['serialNo'].patchValue(this.bannerarray[this.checkedval1].serialNo);
      this.bannerFormGroup.controls['School'].patchValue( this.bannerarray[this.checkedval1].School);
      this.bannerFormGroup.controls['Message'].patchValue( this.bannerarray[this.checkedval1].Message);
      this.bannerFormGroup.controls['StartDate'].patchValue( this.bannerarray[this.checkedval1].StartDate);
      this.bannerFormGroup.controls['EndDate'].patchValue( this.bannerarray[this.checkedval1].EndDate);

  console.log('serialNo of patch'+this.bannerarray[this.checkedval1].serialNo);
 }



 updateEvent(value){

  if(value.serialNo =="" ||value.serialNo == null){
    this.errorMessage = "please enter serialNo";
    this.active ="2";
  }
  else if(value.School =="" ||value.School == null){
    this.errorMessage = "please enter School";
    this.active ="2";
  }
  else if(value.Message =="" ||value.Message == null){
    this.errorMessage = "please enter Message";
    this.active ="2";
  }
  else if(value.StartDate =="" ||value.StartDate == null){
    this.errorMessage = "please enter StartDate";
    this.active ="2";
  }
  else if(value.EndDate =="" ||value.EndDate == null){
    this.errorMessage = "please enter EndDate";
    this.active ="2";
  }
  else{
        var manageBanner = new ManageBanner();
        manageBanner.serialNo = value.serialNo;
        manageBanner.BannerId = this.checkedval;
        manageBanner.School = value.School;
        manageBanner.Message = value.Message;
        manageBanner.StartDate = value.StartDate;
        manageBanner.EndDate = value.EndDate;
        this.bannerarray[this.checkedval]=manageBanner;
        this.selectedBannerArray=[];
      // this.showBannerList();
      this.div_Element_Id="0";
      this.active="1";
  }
  
 }

 deleteBanner(){
 this.bannerarray.splice(this.checkedval1,1);
//  this.checkedval= this.idx
 this.selectedBannerArray=[];
this.showBannerList();

this.rerender();


 }


 viewSingleBannerProfile(){
   this.div_Element_Id ="3";
   var rajuarray = new ManageBanner();
   rajuarray = this.bannerarray[this.checkedval1];
   this.banviewarray=[];
   this.banviewarray.push(rajuarray);
 }

 

 
 checkedmasterBanner(value,index){
  console.log("checked value"+ value);
  if ((<HTMLInputElement>document.getElementById("a"+value)).checked === true) {
        this.selectedBannerArray.push(value);
        this.checkedval= value;
        this.checkedval1= index;
      } else if ((<HTMLInputElement>document.getElementById("a"+value)).checked === false) {
        let indexx = this.selectedBannerArray.indexOf(value);
        this.selectedBannerArray.splice(indexx, 1)
      }
      console.log(this.selectedBannerArray);
 }



 showBannerList(){
    this.selectedBannerArray=[];
    this.div_Element_Id ="0";
    this.bannerFormGroup.controls['serialNo'].patchValue('');
    this.bannerFormGroup.controls['School'].patchValue('');
    this.bannerFormGroup.controls['Message'].patchValue('');
    this.bannerFormGroup.controls['StartDate'].patchValue(new Date());
    this.bannerFormGroup.controls['EndDate'].patchValue(new Date());
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
