import { Component, OnInit,ElementRef,Input } from '@angular/core';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';
import {managetable} from './manage_timetableInterface'
import { from } from 'rxjs/observable/from';
import { Pipe, PipeTransform } from '@angular/core';
@Component({
  selector: 'app-manage-timetable',
  host: {
    '(document:click)': 'handleClick($event)', 
    // '(document1:click)': 'handleClick1($event)',
  },
  templateUrl: './manage-timetable.component.html',
  styleUrls: ['./manage-timetable.component.css'],
  providers:[managetable]

})
export class ManageTimetableComponent implements OnInit {
  active:string = "0";
  tablearray:any[][];
  rForm: FormGroup;
  post:any;                     // A property for our submitted form
  teacher:string = '';
  subject:string = '';
  time:string = '';
  selectedrow:number;
  selectedcolumn:number;
  dayarray=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

  public subquery = '';
  public subjectarray =["Telugu","Hindi","English","Maths","Physics","Chemistry","social studies","GK"]
  public subjectList = [];
  public subref;

  public query = '';
  public teacherarray = ["Raju","Prasad","Shiva","Nithin","Panday","Reethu","Bhanu","Mahesh","Dinesh","Richard","Albert","John","Jack","Henry","Dave","Mikel","Uday","Pramod","Richard","Donald" ];
  public filteredList = [];
  public elementRef;
  public selectedMoment2 = new FormControl(new Date());
  constructor(myElement: ElementRef, private fb: FormBuilder,) {

    this.elementRef = myElement;
    this.subref = myElement;



    this.rForm = new FormGroup({
      'teacher' : new FormControl(),
      'subject' : new FormControl(),
      'time' : new FormControl(),
      
    });
   }

//    public myFilter = (d: Date): boolean => {
//     const day = d.getHours();
//     // Prevent Saturday and Sunday from being selected.
//     return day !== 0 && day !== 6;
// }


  ngOnInit() {
    this.addpost();
  }
  openpopup(i,j){
    this.active = "1"
    console.log("popup index value"+ i +' '+ j);
    this.rForm.controls['teacher'].patchValue( this.tablearray[i][j].teacher);
    this.rForm.controls['subject'].patchValue( this.tablearray[i][j].subject);
    this.rForm.controls['time'].patchValue( this.tablearray[i][j].time);
   this.selectedrow = i;
   this.selectedcolumn = j;
    console.log("get values"+ this.tablearray[i][j] );
    console.log("new date values"+ new Date());
  }
  
  closepopup(){
    this.active = "0"
  }

  addtable(post) {
    var tabvalue = post;
    this.tablearray[this.selectedrow][this.selectedcolumn].teacher = tabvalue.teacher;
    this.tablearray[this.selectedrow][this.selectedcolumn].subject = tabvalue.subject;
    this.tablearray[this.selectedrow][this.selectedcolumn].time = tabvalue.time;
    this.active = "0";

     console.log("table values" +  this.tablearray[this.selectedrow][this.selectedcolumn].time  );
   
  }
  
  addpost(){
    // var chapterdetails =  new Array<managetable>();
    this.tablearray = new Array<Array<any>>();
    for (let y = 0; y <= 6; y++) {
      let row:any[]  = new Array<any>();      
      for (let x = 0; x <=6; x++){
        var managetable1 = new managetable();
        managetable1.teacher="teacher ";
        managetable1.subject="subject ";
        managetable1.time= new Date()+'';
         row.push(managetable1);
    }
    this.tablearray.push(row);
  }
 console.log("table add post");
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
       this.subjectList = [];
   }
}

filter1() {
  if (this.subquery !== ""){
      this.subjectList = this.subjectarray.filter(function(el){
          return el.toLowerCase().indexOf(this.subquery.toLowerCase()) > -1;
      }.bind(this));
  }else{
      this.subjectList = [];
  }
}

select1(item){
  this.subquery = item;
  this.subjectList = [];
}



}
