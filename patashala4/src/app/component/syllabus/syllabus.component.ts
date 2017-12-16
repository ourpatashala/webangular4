  import { Component, OnInit,Inject } from '@angular/core';
  // import { MasterCourseComponentInterface } from "./MasterCourseComponentInterface";
  import { MasterCourseTO } from "./../../to/MasterCourseTO";
  import { MasterCourseVO } from "./../../vo/MasterCourseVO";
  import { MessageTO } from "./../../to/MessageTO";
  import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
  declare var $:any;
  import {MasterCourseConverter} from "../../adapter/interfaces/MasterCourseConverter";
  import {MasterCourseConverterImpl} from "../../adapter/impl/MasterCourseConverterImpl";
  import {inject} from "@angular/core/testing";
  
  import {MasterCourseService} from "../../service/master-course.service";
  import {MasterSyllabusService} from "../../service/master-syllabus.service";
  import {MasterSubjectService} from "../../service/master-subject.service";
  
  import {SyllabusIdNameTO} from "../../to/SyllabusIdNameTO";
  import {FormBuilder, FormControl, FormGroup,FormArray} from "@angular/forms";
  import { AppConstants } from "../../constants/AppConstants";
  
  
  @Component({
    selector: 'app-syllabus',
    templateUrl: './syllabus.component.html',
    styleUrls: ['./syllabus.component.css'],
    providers: [ MasterCourseService,MasterSyllabusService,MasterSubjectService, {provide: 'MasterCourseConverter', useClass: MasterCourseConverterImpl}]
    
  
  })
  export class SyllabusComponent implements OnInit {
  
    syllabusFormGroup:FormGroup;
    errorMessage: string;
    sucessMessage: string;
    masterCourseTOList: FirebaseListObservable<MasterCourseTO>;
    fb: FormBuilder;
    alldata =["Trigonometry","calculas","network&theory"]
    constructor(@Inject('MasterCourseConverter') private masterCourseConverter: MasterCourseConverter,fb: FormBuilder) {
            this.masterCourseConverter.getAllMasterCourse (localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID), this);
            this.fb = fb;
  
    }
   div_Element_Id: string = '0';//for multiple pages in school list page;; 0 to show list of school , 1 to show add school, 2 to show edit school, 3 to show single school view.
    selectedCourseArray: Array<any> = []; 
   ngOnInit() {
  
    this.syllabusFormGroup = this.fb.group({
      courseName: [''],
      syllabusList: this.fb.array([this.initsyllabusNames()]),  
      courseId: ['']
    });
  
    }
    initsyllabusNames() {
      return this.fb.group({
        // list all your form controls here, which belongs to your form array
        syllabusName: ['']
      });
    }
  
    displayMasterCourseCallBack(masterCourseTO: MasterCourseTO){
  
      console.log("displayMasterCourseCallBack ==> "+ masterCourseTO.courseName + " " + masterCourseTO.courseId);
      for (var iIndex=0; iIndex < masterCourseTO.syllabusList.length; iIndex++){
        console.log("syllabus ==> "+ masterCourseTO.syllabusList[iIndex].syllabusName );
      }
  
  
    }
  
    displayAllMasterCourseCallBack(masterCourseTOList:FirebaseListObservable<MasterCourseTO>){
  
      console.log("displayAllMasterCourseCallBack ==> "+ masterCourseTOList);
  this.masterCourseTOList=masterCourseTOList;
      masterCourseTOList.forEach(obj => {
        console.log(obj.courseId + ' ' + obj.courseName );
        for (var iIndex=0; iIndex < obj.syllabusList.length; iIndex++){
          console.log("syllabus ==> "+ obj.syllabusList[iIndex].syllabusName );
        }
  
      });
  
    }
  
    successMessageCallBack(messageTO:MessageTO) {
      if(messageTO.serviceMethodName=='searchAndAddMasterCourse()')
      {
        this. showCourseList();
      }
      console.log("successMessageCallBack ==>" + messageTO.messageInfo+"  "+ messageTO.messageType+"  "+messageTO.serviceClassName+"  "+messageTO.serviceMethodName);
  
    }
  
    /**
     * Handle all the error messages here . Basing on the error message decide where you want to display
     * the Error Message, Also if required you can recirect to any page basing on the navigate method
     * given below.
     *
     * @param message
     */
    errorMessageCallBack(messageTO:MessageTO) {
      console.log("errorMessageCallBack ==>" + messageTO.messageInfo);
  
    }
  
    // testAdd(){
  
    //   var masterCourseTO = new MasterCourseTO();
    //   //masterSubjectVO.uniqueId = "";
  
    //   masterCourseTO.courseName = "Inter 2nd Year";
  
    //   var syllabusList = new Array <SyllabusIdNameTO> ( );
    //   var syllabus1 = new SyllabusIdNameTO();
  
    //   syllabus1.syllabusName = "Science 2nd Year"
    //   syllabus1.syllabusId = syllabus1.syllabusName.toLowerCase()
  
    //   syllabusList[0] = syllabus1
  
    //   var syllabus2 = new SyllabusIdNameTO();
    //   syllabus2.syllabusName = "Maths 2nd Year"
    //   syllabus2.syllabusId = syllabus2.syllabusName.toLowerCase()
  
    //   syllabusList[1] = syllabus2
  
    //   masterCourseTO.syllabusList = syllabusList
  
  
    //   this.masterCourseConverter.addMasterCourse(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID),masterCourseTO,this);
  
    // }
  
    // testUpdate(){
  
    //   var masterCourseTO = new MasterCourseTO();
    //   //masterSubjectVO.uniqueId = "";
  
    //   //masterCourseTO.courseId = '-L055eRXjeZ09DvqdyXe';
    //   masterCourseTO.courseName = "Inter 2nd Years";
  
    //   var syllabusList = new Array <SyllabusIdNameTO> ( );
    //   var syllabus1 = new SyllabusIdNameTO();
  
    //   syllabus1.syllabusName = "Science 2nd Year"
    //   syllabus1.syllabusId = syllabus1.syllabusName.toLowerCase()
  
    //   syllabusList.push(syllabus1);
  
    //   var syllabus2 = new SyllabusIdNameTO();
    //   syllabus2.syllabusName = "Maths 2nd Year"
    //   syllabus2.syllabusId = syllabus2.syllabusName.toLowerCase()
  
    //   syllabusList.push(syllabus2)
  
  
    //   var syllabus1 = new SyllabusIdNameTO();
      
    //       syllabus1.syllabusName = "Science 2nd Year"
    //       syllabus1.syllabusId = syllabus1.syllabusName.toLowerCase()
      
    //       syllabusList.push(syllabus1)
      
    //       var syllabus2 = new SyllabusIdNameTO();
    //       syllabus2.syllabusName = "Maths 2nd Year"
    //       syllabus2.syllabusId = syllabus2.syllabusName.toLowerCase()
      
    //       syllabusList.push(syllabus2)
  
    //   masterCourseTO.syllabusList = syllabusList
  
    //   this.masterCourseConverter.updateMasterCourse(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID),"-L055eRXjeZ09DvqdyXe", masterCourseTO,this);
  
    // }
  
    // testGet(){
  
    //   this.masterCourseConverter.getMasterCourse(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID),"-L050YFABwj4eciWWkv2", this);
  
    // }
  
    // testGetAll(){
  
    //   this.masterCourseConverter.getAllMasterCourse (localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID), this);
  
    // }
  
    // testDelete(){
  
    //   this.masterCourseConverter.deleteMasterCourse(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID), "-L-r3O1-fM__L_tldUGE", this);
  
    // }

    show_addCourseFields(){
      this.div_Element_Id = "1";
      console.log(this.div_Element_Id);
    
    }
    addSyllabusSubmit({value, valid}: { value: MasterCourseTO, valid: boolean })
    {
      var syllabusList = new Array <SyllabusIdNameTO> ( );
      var masterCourseTO = new MasterCourseTO();
        var syllabus1 = new SyllabusIdNameTO();
        masterCourseTO.courseName=value.courseName;
      if (value.syllabusList != null) {
        for (var loopvar = 0; loopvar < value.syllabusList.length; loopvar++) {
          var syllabus2 = new SyllabusIdNameTO();
          syllabus2.syllabusName = value.syllabusList[loopvar].syllabusName;
          syllabus2.syllabusId = syllabus2.syllabusName.toLowerCase();
          syllabusList.push(syllabus2)
        }
      }
      masterCourseTO.syllabusList = syllabusList
      this.masterCourseConverter.addMasterCourse(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID),masterCourseTO,this);
    }
    getselectedCourseProfile(){
      this.div_Element_Id = "2";
      console.log(this.div_Element_Id);
    }
    
    showCourseList()
    {
      this.selectedCourseArray = [];
      this.div_Element_Id='0';
      this.masterCourseConverter.getAllMasterCourse(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID), this);
  
    }
    checkedmasterCourse(value){
       if ((<HTMLInputElement>document.getElementById(value)).checked === true) {
        this.selectedCourseArray.push(value);
      } else if ((<HTMLInputElement>document.getElementById(value)).checked === false) {
        let indexx = this.selectedCourseArray.indexOf(value);
        this.selectedCourseArray.splice(indexx, 1)
      }
      console.log(this.selectedCourseArray)
    }
   
    deleteSyllabusName(i: number) {
      // control refers to your formarray
      const control = <FormArray>this.syllabusFormGroup.controls['syllabusList'];
      // remove the chosen row
      control.removeAt(i);
    }
  
  
    // showCourseList(){
      
    //       // if (this.selectedStudentArray.length > 0) (<HTMLInputElement>document.getElementById(this.selectedStudentArray[0])).checked = false;
    //       // this.selectedStudentArray = [];
    //       // this.div_Element_Id = "0";
    //       // this.errorMessage = "";
    //       // this.active = "0";
    //       // this.showupload="0";
    //       // this.getAllStudents(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID));
      
    //     }
  
  
    // updateCourse({value, valid}: { value: MasterCourseTO, valid: boolean }){
    //  var field_name = "";
    //   this.errorMessage = field_name;
    //  // this.active = "0";
    //   if (value.courseName == null || value.courseName == ""){
    //     field_name = field_name + " course Name, ";
    //   }
      
    //   //alert(value);
    // }
    
    
  
    addSyllabusName() {
      // control refers to your formarray
      const control = <FormArray>this.syllabusFormGroup.controls['syllabusList'];
      // add new formgroup
      control.push(this.initsyllabusNames());
    }
  
  
    deleteCourse() {
      for (var loopvar = 0; loopvar < this.selectedCourseArray.length; loopvar++) {
        console.log(this.selectedCourseArray[loopvar]);
        this.masterCourseConverter.deleteMasterCourse(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID), this.selectedCourseArray[loopvar], this);
       // this.masterCourseConverter.deleteMasterCourse(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID), "-L-r3O1-fM__L_tldUGE", this);
        
      }
      this.selectedCourseArray= [];
      this. showCourseList();
  
    }
  }
  
  






