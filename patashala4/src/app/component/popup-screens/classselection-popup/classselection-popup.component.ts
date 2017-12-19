
import { Component, Input, Output, Inject, EventEmitter,OnInit } from '@angular/core';
import {DataTableDirective} from 'angular-datatables';
import {ViewChild} from '@angular/core';
import {Subject} from 'rxjs/Rx';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database-deprecated';
import {ClassProfileTO} from "./../../../to/ClassProfileTO";
import { AppConstants } from "../../../constants/AppConstants";
import {StudentComponentInterface} from "./../../student/StudentComponentInterface";
import {StudentTO} from "../../../to/StudentTO";
import {MessageTO} from "../../../to/MessageTO";
import {StudentConverter} from "../../../adapter/interfaces/StudentConverter";


@Component({
  selector: 'app-classselection-popup',
  templateUrl: './classselection-popup.component.html',
  styleUrls: ['./classselection-popup.component.css']
})
export class ClassselectionPopupComponent implements OnInit, StudentComponentInterface {
  @ViewChild(DataTableDirective) dtElementclass: DataTableDirective;
  dtTriggerclass: Subject<any> = new Subject();
  dtOptionsclass: DataTables.Settings = {};
  flag: boolean = false;
  classselectedflag: boolean=false;
  classId: string;
  classNames: string;
  classProfileTOList: FirebaseListObservable<ClassProfileTO>;
  @Output() notify: EventEmitter<string> = new EventEmitter<string>();

  constructor(@Inject("StudentConverter") private studentConverter: StudentConverter) {
    this.studentConverter.getAllClassesProfile(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID), this);

   }
  ngOnInit() {

  }
  ngOnChanges() {

   // console.log('click');
    this.rerender();

  }
  displayAllStudentCallBack(studentTO: FirebaseListObservable<StudentTO>) {
  }
  displayAllClassesCallBack(classProfileTO: FirebaseListObservable<ClassProfileTO>) {
    this.classProfileTOList=classProfileTO;
    classProfileTO.forEach(classsProfileTO => {
      console.log('class Profile:', classsProfileTO);
    });
    this.rerender();
  }
  displayPhotoCallBack(url: string) {

  }
  displayPhotoWithURLCallBack(url: string) {

        //TODO Shiva display the Image using the URL
       // this.photourl=url;
        console.log("displayPhotoWithURLCallBack : Image URL " + url)
      }
  displayStudentCallBack(studentTO: StudentTO) {

  }

  successMessageCallBack(messageTO: MessageTO) {
  }

  errorMessageCallBack(messageTO: MessageTO) {

  }
  ngAfterViewInit(): void {
    this.dtTriggerclass.next();
  }
  closePopup()
  {
    this.notify.emit(this.classselectedflag+"");
  }
  getClassId(classId,className)
  {
    localStorage.setItem(AppConstants.SHAREDPREFERANCE_STUDENTCLASSID,classId);
    localStorage.setItem(AppConstants.SHAREDPREFERANCE_STUDENTCLASSNAME,className);
    this.classselectedflag=true;
    this.classNames=className;
  }
    onClick() {
      this.notify.emit('Click from nested component');
    }


    rerender(): void {
      console.log("render call " + this.flag+"   "+this.dtElementclass);
      if (!this.flag && this.dtElementclass != null) {
        this.flag = true;
        this.dtElementclass.dtInstance.then((dtInstance: DataTables.Api) => {
          console.log("shiva 111" +dtInstance);
          // Destroy the table first
          dtInstance.destroy();
          // Call the dtTrigger to rerender again
          console.log("shiva 222 "+this.dtTriggerclass);
          if(this.dtTriggerclass!=null)
            this.dtTriggerclass.next();
          else
            console.log("error as null");
          this.flag = false;
        });
      }

    }
}
