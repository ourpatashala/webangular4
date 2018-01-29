import {Component, OnInit,ElementRef, Inject} from '@angular/core';
import {ViewChild} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {Router} from "@angular/router";
import {DataTableDirective} from 'angular-datatables';
import {FormBuilder, FormControl, FormGroup, FormArray} from "@angular/forms";
import { DatepickerOptions } from 'ng2-datepicker';
import {inject} from "@angular/core/testing";
import {Subject} from 'rxjs/Rx';





@Component({
  selector: 'app-manage-classes',
  templateUrl: './manage-classes.component.html',
  host: {
    '(document:click)': 'handleClick($event)', 
    // '(document1:click)': 'handleClick1($event)',
  },
  styleUrls: ['./manage-classes.component.css']
})
export class ManageClassesComponent implements OnInit {

  classFormGroup:FormGroup;


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




  constructor(myElement: ElementRef, private fb:FormBuilder ) {

    this.elementRef = myElement;


   }

  ngOnInit() {
    this.classFormGroup = this.fb.group({
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
  }

  showClassList(){
    this.div_Element_Id ="0";
  }

  checkedmasterClass(){

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

























}
