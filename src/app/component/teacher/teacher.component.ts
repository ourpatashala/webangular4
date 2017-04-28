
import {Component, OnInit, Input, Inject} from '@angular/core';
import {StudentService} from "../../service/student.service";
import {StudentConverter} from "../../adapter/interfaces/StudentConverter";
import {
  FormGroup, FormControl, Validators, FormBuilder, FormArray, AbstractControl
}
  from '@angular/forms';
import {ArrayType} from "@angular/compiler/src/output/output_ast";
import {TeacherConverterImpl} from "../../adapter/TeacherConverterImpl";
import {TeacherTO} from "../../to/TeacherTO";



@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  providers: [StudentService, { provide: 'TeacherConverter', useClass: TeacherConverterImpl }],

  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  teacherTO:TeacherTO;
  studentFormGroup: FormGroup;
  errorMessage:string;
  fb:FormBuilder;
  @Input() inputArray: ArrayType[];

  constructor(@Inject('StudentConverter') private studentConverter:StudentConverter,private studentService: StudentService,fb: FormBuilder) {
    this.fb = fb;
  }

  ngOnInit() {
    this.studentFormGroup = new FormGroup(
      {
        lastName:new FormControl(''),
        schoolId:new FormControl(''),
        firstName  :new FormControl(''),
        middleName :new FormControl(''),
        dob  :new FormControl(''),
        id  :new FormControl(''),
        gender:new FormControl(''),
        fatherName:new FormControl(''),
        motherName:new FormControl(''),
        remarks:new FormControl(''),
        schoolName:new FormControl(''),
        className:new FormControl(''),
        profilePhotoUrl:new FormControl(''),
        bloodGroup:new FormControl(''),
        classId:new FormControl(''),

        phoneNumbers: this.fb.array([
          this.initPhoneNumbers(),
        ]),


        siblings: this.fb.array([
          this.initSiblings(),
        ]),



        address:new FormGroup({
          city: new FormControl(''),
          doorNo:new FormControl('')
        })
      }
    );




  }


  addPhoneNumbers() {
    const control = <FormArray>this.studentFormGroup.controls['phoneNumbers'];
    control.push(this.initPhoneNumbers());
  }



  addSiblings() {
    const control = <FormArray>this.studentFormGroup.controls['siblings'];
    control.push(this.initSiblings());
  }



  initPhoneNumbers() {
    return this.fb.group({
      phoneNumber: ['']
    });
  }


  initSiblings() {
    return this.fb.group({
      keyInfo: [''],
      valueInfo: ['']
    });
  }


  getStudentProfile(schoolId:string,studentId:string){
    var studentInfo =  this.studentService.getStudentProfile(schoolId,studentId);
    studentInfo.subscribe(snapshot => {
      console.log(snapshot);
      Object.keys(snapshot).forEach(key=> {
        console.log(snapshot[key])  ;
      });
    });

  }



}

