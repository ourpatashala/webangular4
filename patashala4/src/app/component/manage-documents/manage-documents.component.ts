import {Component, OnInit,ElementRef, Inject} from '@angular/core';
import {ViewChild} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {Router} from "@angular/router";
import {DataTableDirective} from 'angular-datatables';
import {FormBuilder, FormControl, FormGroup, FormArray} from "@angular/forms";
import { DatepickerOptions } from 'ng2-datepicker';
import {inject} from "@angular/core/testing";
import {Subject} from 'rxjs/Rx';
import {ManageDocuments} from './manage-documentsinterface';

@Component({
  selector: 'app-manage-documents',
  templateUrl: './manage-documents.component.html',
  host: {
    '(document:click)': 'handleClick1($event)', 
  },
  styleUrls: ['./manage-documents.component.css']
})
export class ManageDocumentsComponent implements OnInit {

  documentFormGroup:FormGroup;
  checkedval:number;
  checkedval1:number;
  // classtable:boolean=false;
  errorMessage: string;
  active: string = "0";// for error and success divs;;  0 for no content, 1 for success, 2 for error
  @ViewChild(DataTableDirective) 
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  flag: boolean = false;
  // Doctype: new Date(),
  div_Element_Id: string = '0';//for multiple pages in school list page;; 0 to show list of school , 1 to show add school, 2 to show edit school, 3 to show single school view.
  selecteddocumentArray: Array<any> = [];
  public query = '';
  public documentClassarray = ["1st Class","2nd Class","3rd Class","4th Class","5th Class","6th Class","7th Class","8th Class","9th Class","10th Class" ];
  public filteredList = [];
  public elementRef;
  classarray:ManageDocuments[] = [];
  rajuarray1:ManageDocuments[] = [];
  
  
  closePopup() {
    // this.sucessMessage = "";
    this.active = "0";
    // this.showClassSelection=false;
    // if (this.popupstatus == "1")
     this.showDocumentList();
  }


  constructor(myElement: ElementRef, private fb:FormBuilder ) {

    this.elementRef = myElement;


   }

  ngOnInit() {
    this.documentFormGroup = this.fb.group({

      'Doc_id' : [''],
      'className' : [''],
      'DocumentName' : [''],
      'Description' :  [''],
      'Doctype' : [''],
      'Category' :[''],
      'Upload' :  [''],
      
    });
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  show_addClassFields(){
    this.div_Element_Id="1";
    // this.selecteddocumentArray=[''];
  }


 filter() {
    if (this.query !== ""){
        this.filteredList = this.documentClassarray.filter(function(el){
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

handleClick1(event){
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


public files:any;
onChange(event) {
  this.files = event.srcElement.files;
  console.log(this.files);
}

addClassSubmit(value){

// console.log(value);
// this.classarray= new Array<ManageDocuments>();
 if(value.className =="" ||value.className == null){
   this.errorMessage = "please enter className";
   this.active ="2";
 }
 else if(value.DocumentName =="" ||value.DocumentName == null){
   this.errorMessage = "please enter DocumentName";
   this.active ="2";
 }
 else if(value.Description =="" ||value.Description == null){
   this.errorMessage = "please enter Description";
   this.active ="2";
 }
 else if(value.Doctype =="" ||value.Doctype == null){
   this.errorMessage = "please enter Doctype";
   this.active ="2";
 }
 else if(value.Category =="" ||value.Category == null){
   this.errorMessage = "please enter Category";
   this.active ="2";
 }
//  else if(value.Upload =="" ||value.Upload == null){
//    this.errorMessage = "please enter Upload";
//    this.active ="2";
//  }
 else{
    var manageDocuments = new ManageDocuments();
    manageDocuments.className = value.className;
     manageDocuments.Doc_id = this.classarray.length;
    manageDocuments.DocumentName = value.DocumentName;
    manageDocuments.Description = value.Description;
    manageDocuments.Doctype = value.Doctype;
    manageDocuments.Category = value.Category;
    manageDocuments.Upload = this.files;
  this.classarray.push(manageDocuments);

  console.log('class Name' + value.className);
  console.log('Course Name' + value.DocumentName);
  console.log('Doc_id Name' + manageDocuments.Doc_id);
  console.log("class array val" + this.classarray.length);
  // this.showDocumentList();
  // this.div_Element_Id="0";
  this.active ="1";
  
 }
}




 getselectedClassProfile(){
  this.div_Element_Id ="2";
      this.documentFormGroup.controls['className'].patchValue(this.classarray[this.checkedval1].className);
      this.documentFormGroup.controls['DocumentName'].patchValue( this.classarray[this.checkedval1].DocumentName);
      this.documentFormGroup.controls['Description'].patchValue( this.classarray[this.checkedval1].Description);
      this.documentFormGroup.controls['Doctype'].patchValue( this.classarray[this.checkedval1].Doctype);
      this.documentFormGroup.controls['Category'].patchValue( this.classarray[this.checkedval1].Category);
      this.documentFormGroup.controls['Upload'].patchValue( this.classarray[this.checkedval1].Upload);
  console.log('classname of patch'+this.classarray[this.checkedval1].className);
 }



 updateClassSubmit(value){

  if(value.className =="" ||value.className == null){
    this.errorMessage = "please enter className";
    this.active ="2";
  }
  else if(value.DocumentName =="" ||value.DocumentName == null){
    this.errorMessage = "please enter DocumentName";
    this.active ="2";
  }
  else if(value.Description =="" ||value.Description == null){
    this.errorMessage = "please enter Description";
    this.active ="2";
  }
  else if(value.Doctype =="" ||value.Doctype == null){
    this.errorMessage = "please enter Doctype";
    this.active ="2";
  }
  else if(value.Category =="" ||value.Category == null){
    this.errorMessage = "please enter Category";
    this.active ="2";
  }
  else if(value.Upload =="" ||value.Upload == null){
    this.errorMessage = "please enter Upload";
    this.active ="2";
  }
  else{
      var manageDocuments = new ManageDocuments();
        manageDocuments.className = value.className;
        manageDocuments.Doc_id =   this.checkedval;
        manageDocuments.DocumentName = value.DocumentName;
        manageDocuments.Description = value.Description;
        manageDocuments.Doctype = value.Doctype;
        manageDocuments.Category = value.Category;
        manageDocuments.Upload =this.files;;
        this.classarray[this.checkedval]=manageDocuments;
      this.selecteddocumentArray=[];
      this.showDocumentList();
  }
  
 }

 deleteClass(){
   this.classarray.splice(this.checkedval1,1);
  this.selecteddocumentArray=[];
  //  this.showDocumentList();
  this.rerender();
 }


 viewSingleClassProfile(){
   this.div_Element_Id ="3";
   var rajuarray = new ManageDocuments();
   rajuarray = this.classarray[this.checkedval1];
   this.rajuarray1=[];
   this.rajuarray1.push(rajuarray);
 }

 

 
checkedmasterClass(value,index){
  console.log("checked value"+ value);
  console.log("checked index value"+ index);
  if ((<HTMLInputElement>document.getElementById("a"+value)).checked === true) {
        this.selecteddocumentArray.push(value);
        this.checkedval= value;
        this.checkedval1= index;
      } else if ((<HTMLInputElement>document.getElementById("a"+value)).checked === false) {
        let indexx = this.selecteddocumentArray.indexOf(value);
        this.selecteddocumentArray.splice(indexx, 1)
      }
      console.log(this.selecteddocumentArray);
 }



 showDocumentList(){
  
   this.selecteddocumentArray=[];
   this.div_Element_Id ="0";
  this.documentFormGroup.controls['className'].patchValue('');
  this.documentFormGroup.controls['DocumentName'].patchValue('');
  this.documentFormGroup.controls['Description'].patchValue('');
  this.documentFormGroup.controls['Doctype'].patchValue('');
  this.documentFormGroup.controls['Category'].patchValue('');
  this.documentFormGroup.controls['Upload'].patchValue('');
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
