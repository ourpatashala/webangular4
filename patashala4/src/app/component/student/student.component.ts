import { Component, OnInit } from '@angular/core';
import {AppComponent} from './../../app.component';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ArrayType} from "@angular/compiler/src/output/output_ast";
import {Router} from "@angular/router";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
declare var $:any;
import { Subject } from 'rxjs/Rx';




@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  selectedStudentArray:Array<any>= [];
  dtOptions: DataTables.Settings = {};
  x:string;
  errorMessage:string;
  sucessMessage:string;
  subscription: Subscription;
  message: string = '';
  dtTrigger = new Subject();


  active:string="0";// for error and success divs;;  0 for no content, 1 for success, 2 for error 
  div_Element_Id: string= "0";//for multiple pages in school list page;;  0 to show list of school , 1 to show add school, 2 to show edit school, 3 to show single school view.


  constructor() {

    this.dtTrigger.next();
   }

  ngOnInit() {
}
showSchoolsList()
{
  if(this.selectedStudentArray.length>0)
    (<HTMLInputElement>document.getElementById(this.selectedStudentArray[0])).checked = false;
  this.selectedStudentArray = [];
  this.div_Element_Id="0";
  this.errorMessage = "";
  this.active="0";
}

show_addStudentFields()
{
  this.div_Element_Id="1";
}
getselectedStudentProfile()
{
  this.div_Element_Id="2";
}
viewSingleStudentProfile()
{
  this.div_Element_Id="3";
}


}
